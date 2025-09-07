const express = require('express');
require("dotenv").config();
const app = express();
const port = 9000;
app.use(express.json());

const path = require('path');
const fs = require('fs');
const cors = require('cors');
app.use(cors());
const uploadFolder = path.join(__dirname, "uploads");

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper to extract publicId from Cloudinary URL
function extractPublicIdFromUrl(url) {
  if (!url || typeof url !== "string") return null;
  const m = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
  return m ? m[1] : null;
}

// Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "vastra_uploads", // Cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  }
});

const upload = multer({ storage });

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to Mongodb Atlas!'));

// ======= Signup/Login =======
var SignupSchema = mongoose.Schema({
  fullname: String,
  phoneno: String,
  email: { type: String, unique: true },
  pass: String,
  gender: String,
  usertype: String
}, { versionKey: false });

var SignupModel = mongoose.model("signup", SignupSchema, "signup");

app.post("/api/signup", async (req, res) => {
  try {
    var newrecord = new SignupModel({
      fullname: req.body.fullname,
      phoneno: req.body.phoneno,
      email: req.body.email,
      pass: req.body.pass,
      gender: req.body.gender,
      usertype: "normal"
    });
    var result = await newrecord.save();
    if (result) res.send({ msg: "Signup Successful" });
    else res.send({ msg: "Signup Failed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Error occurred" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    var result = await SignupModel.find({ email: req.body.email, pass: req.body.password }).select("-pass");
    if (result.length === 0) res.status(200).send({ statuscode: 0 });
    else res.status(200).send({ statuscode: 1, pdata: result[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ statuscode: -1 });
  }
});

app.put("/api/changepassword", async (req, res) => {
  try {
    var updateresult = await SignupModel.updateOne(
      { email: req.body.uemail, pass: req.body.currentpass },
      { $set: { pass: req.body.newpass } }
    );
    if (updateresult.modifiedCount === 1) res.status(200).send({ statuscode: 1 });
    else res.status(200).send({ statuscode: 0 });
  } catch (e) {
    console.log(e);
    res.status(500).send({ statuscode: -1, msg: "Some error occurred" });
  }
});

app.get("/api/searchuser", async (req, res) => {
  var result = await SignupModel.find({ email: req.query.email });
  if (result.length === 0) res.status(200).send({ statuscode: 0 });
  else res.status(200).send({ statuscode: 1, searchdata: result });
});

app.get("/api/getallusers", async (req, res) => {
  var result = await SignupModel.find();
  if (result.length === 0) res.status(200).send({ statuscode: 0 });
  else res.status(200).send({ statuscode: 1, userdata: result });
});

app.delete("/api/deluser/:uid", async (req, res) => {
  var result = await SignupModel.deleteOne({ _id: req.params.uid });
  if (result.deletedCount === 1) res.status(200).send({ statuscode: 1 });
  else res.status(200).send({ statuscode: 0 });
});

// ======= Categories =======
var catSchema = mongoose.Schema({ catname: String, catpic: String }, { versionKey: false });
var CatModel = mongoose.model("category", catSchema, "category");

app.post("/api/savecategory", upload.single("catpic"), async (req, res) => {
  try {
    var pictureUrl = req.file ? req.file.path : "https://res.cloudinary.com/ds9atncxn/image/upload/v1757244936/no_image_ctsag9.jpg";
    var newrecord = new CatModel({ catname: req.body.catname, catpic: pictureUrl });
    var result = await newrecord.save();
    if (result) res.status(200).send({ statuscode: 1, imageUrl: pictureUrl });
    else res.status(200).send({ statuscode: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).send({ statuscode: -1, error: err.message });
  }
});

app.get("/api/getallcat", async (req, res) => {
  var result = await CatModel.find();
  if (result.length === 0) res.status(200).send({ statuscode: 0 });
  else res.status(200).send({ statuscode: 1, catdata: result });
});

app.put("/api/updatecategory", upload.single("catpic"), async (req, res) => {
  try {
    let pictureUrl;
    if (!req.file) {
      pictureUrl = req.body.oldpicname;
    } else {
      pictureUrl = req.file.path;
      if (req.body.oldpicname && !req.body.oldpicname.includes("sample.jpg")) {
        const oldPublicId = extractPublicIdFromUrl(req.body.oldpicname);
        if (oldPublicId) {
          try {
            await cloudinary.uploader.destroy(oldPublicId);
          } catch (err) {
            console.error("Cloudinary delete error:", err.message);
          }
        }
      }
    }
    var updateresult = await CatModel.updateOne(
      { _id: req.body.cid },
      { $set: { catname: req.body.catname, catpic: pictureUrl } }
    );
    if (updateresult.modifiedCount === 1) res.status(200).send({ statuscode: 1, imageUrl: pictureUrl });
    else res.status(200).send({ statuscode: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).send({ statuscode: -1, error: err.message });
  }
});

// Delete category with Cloudinary image
app.delete("/api/delcat/:id", async (req, res) => {
  try {
    const doc = await CatModel.findById(req.params.id);
    if (!doc) return res.status(404).send({ statuscode: 0, msg: "Category not found" });

    if (doc.catpic && !doc.catpic.includes("sample.jpg")) {
      const publicId = extractPublicIdFromUrl(doc.catpic);
      if (publicId) {
        try { await cloudinary.uploader.destroy(publicId); }
        catch (err) { console.error("Cloudinary delete error (category):", err.message); }
      }
    }

    const result = await CatModel.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 1) res.status(200).send({ statuscode: 1 });
    else res.status(200).send({ statuscode: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).send({ statuscode: -1, error: err.message });
  }
});

// ======= Products =======
var prodSchema = mongoose.Schema({
  catid: String,
  pname: String,
  Rate: Number,
  Discount: Number,
  Stock: Number,
  Description: String,
  picture: String,
  addedon: String
}, { versionKey: false });

var ProdModel = mongoose.model("product", prodSchema, "product");

app.post("/api/saveproduct", upload.single("picture"), async (req, res) => {
  try {
    var pictureUrl = req.file ? req.file.path : "https://res.cloudinary.com/ds9atncxn/image/upload/v1757244936/no_image_ctsag9.jpg";
    var newrecord = new ProdModel({
      catid: req.body.catid,
      pname: req.body.pname,
      Rate: req.body.rate,
      Discount: req.body.dis,
      Stock: req.body.stock,
      Description: req.body.descp,
      picture: pictureUrl,
      addedon: new Date()
    });
    var result = await newrecord.save();
    if (result) res.status(200).send({ statuscode: 1, imageUrl: pictureUrl });
    else res.status(200).send({ statuscode: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).send({ statuscode: -1, error: err.message });
  }
});

app.get("/api/fetchprodsbycatid", async (req, res) => {
  var result = await ProdModel.find({ catid: req.query.cid });
  if (result.length === 0) res.status(200).send({ statuscode: 0 });
  else res.status(200).send({ statuscode: 1, proddata: result });
});

app.get("/api/fetchnewprods", async (req, res) => {
  var result = await ProdModel.find().sort({ "addedon": -1 }).limit(5);
  if (result.length === 0) res.status(200).send({ statuscode: 0 });
  else res.status(200).send({ statuscode: 1, proddata: result });
});

app.get("/api/getproddetails",async(req,res)=>
    {
        var result = await ProdModel.find({_id:req.query.pid})
        //result will become an array because find function returns an array
        if(result.length===0)
        {
            res.status(200).send({statuscode:0})
        }
        else
        {
            res.status(200).send({statuscode:1,proddata:result[0]})
        }    
    })

app.put("/api/updateproduct", upload.single("prodpic"), async (req, res) => {
  try {
    let pictureUrl;
    if (!req.file) pictureUrl = req.body.oldpicname;
    else {
      pictureUrl = req.file.path;
      if (req.body.oldpicname && !req.body.oldpicname.includes("sample.jpg")) {
        const oldPublicId = extractPublicIdFromUrl(req.body.oldpicname);
        if (oldPublicId) {
          try {
            await cloudinary.uploader.destroy(oldPublicId);
          } catch (err) {
            console.error("Cloudinary delete error (updateproduct):", err.message);
          }
        }
      }
    }
    const updateresult = await ProdModel.updateOne(
      { _id: req.body.prodid },
      {
        $set: {
          pname: req.body.prodname,
          picture: pictureUrl,
          Rate: req.body.rate,
          Discount: req.body.dis,
          Stock: req.body.stock,
          Description: req.body.descp
        }
      }
    );
    if (updateresult.modifiedCount === 1) res.status(200).send({ statuscode: 1, imageUrl: pictureUrl });
    else res.status(200).send({ statuscode: 0 });
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ statuscode: -1, msg: "Some error occurred" });
  }
});

// Delete product with Cloudinary image
app.delete("/api/delproduct/:id", async (req, res) => {
  try {
    const prod = await ProdModel.findById(req.params.id);
    if (!prod) return res.status(404).send({ statuscode: 0, msg: "Product not found" });

    if (prod.picture && !prod.picture.includes("sample.jpg")) {
      const publicId = extractPublicIdFromUrl(prod.picture);
      if (publicId) {
        try { await cloudinary.uploader.destroy(publicId); }
        catch (err) { console.error("Cloudinary delete error (product):", err.message); }
      }
    }

    const result = await ProdModel.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 1) res.status(200).send({ statuscode: 1 });
    else res.status(200).send({ statuscode: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).send({ statuscode: -1, error: err.message });
  }
});

// ======= Cart =======
var cartSchema = mongoose.Schema({
  pid: String,
  picture: String,
  ProdName: String,
  Rate: Number,
  Qty: Number,
  TotalCost: Number,
  email: String
}, { versionKey: false });

var CartModel = mongoose.model("cart", cartSchema, "cart");

app.post("/api/savetocart", async (req, res) => {
  try {
    var newrecord = new CartModel({
      pid: req.body.pid,
      picture: req.body.picture,
      ProdName: req.body.pname,
      Rate: req.body.rate,
      Qty: req.body.qty,
      TotalCost: req.body.tc,
      email: req.body.email
    });
    var result = await newrecord.save();
    if (result) res.status(200).send({ statuscode: 1 });
    else res.status(200).send({ statuscode: 0 });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ statuscode: -1 });
  }
});

app.get("/api/getcart", async (req, res) => {
  try {
    var result = await CartModel.find({ email: req.query.uemail });
    if (result.length === 0) res.status(200).send({ statuscode: 0 });
    else res.status(200).send({ statuscode: 1, cartinfo: result });
  } catch (e) {
    res.status(500).send({ statuscode: -1, errmsg: e.message });
  }
});

app.delete("/api/delcartitem/:ciid", async (req, res) => {
  try {
    var result = await CartModel.deleteOne({ _id: req.params.ciid });
    if (result.deletedCount === 1) res.status(200).send({ statuscode: 1 });
    else res.status(200).send({ statuscode: 0 });
  } catch (e) {
    console.log(e);
    res.status(500).send({ statuscode: -1, msg: "Some error occurred" });
  }
});

app.delete("/api/deletecart", async (req, res) => {
  try {
    var result = await CartModel.deleteMany({ email: req.query.un });
    if (result.deletedCount >= 1) res.status(200).send({ statuscode: 1 });
    else res.status(200).send({ statuscode: 0 });
  } catch (e) {
    console.log(e);
    res.status(500).send({ statuscode: -1, msg: "Some error occurred" });
  }
});

// ======= Orders =======
var orderSchema = mongoose.Schema({
  state: String,
  city: String,
  pincode: String,
  area: String,
  billamt: Number,
  phoneno: String,
  name: String,
  email: String,
  OrderDate: String,
  PayMode: String,
  CardDetails: Object,
  OrderProducts: [Object],
  status: String
}, { versionKey: false });

var OrderModel = mongoose.model("finalorder", orderSchema, "finalorder");

app.post("/api/saveorder", async (req, res) => {
  try {
    var newrecord = new OrderModel({
      state: req.body.state,
      city: req.body.city,
      pincode: req.body.pincode,
      area: req.body.area,
      billamt: req.body.tbill,
      email: req.body.email,
      name: req.body.name,
      phoneno: req.body.phoneno,
      OrderDate: new Date(),
      PayMode: req.body.pmode,
      CardDetails: req.body.carddetails,
      OrderProducts: req.body.cartinfo,
      status: "Payment received, processing"
    });
    var result = await newrecord.save();
    if (result) res.status(200).send({ statuscode: 1 });
    else res.status(200).send({ statuscode: 0 });
  } catch (e) {
    console.log(e);
    res.status(500).send({ statuscode: -1, msg: "Some error occurred" });
  }
});

app.put("/api/updatestock", async (req, res) => {
  try {
    var cartdata = req.body.cartinfo;
    let success = true;
    for (var x = 0; x < cartdata.length; x++) {
      var updateresult = await ProdModel.updateOne({ _id: cartdata[x].pid }, { $inc: { "Stock": -cartdata[x].Qty } });
      if (updateresult.modifiedCount !== 1) success = false;
    }
    if (success) res.status(200).send({ statuscode: 1 });
    else res.status(200).send({ statuscode: 0 });
  } catch (e) {
    console.log(e);
    res.status(500).send({ statuscode: -1, msg: "Some error occurred" });
  }
});

app.get("/api/getorderid", async (req, res) => {
  try {
    var result = await OrderModel.findOne({ email: req.query.un }).sort({ "OrderDate": -1 });
    if (result) res.status(200).send({ statuscode: 1, orderdata: result });
    else res.status(200).send({ statuscode: 0 });
  } catch (e) {
    res.status(500).send({ statuscode: -1, errmsg: e.message });
  }
});

app.get("/api/getallorders", async (req, res) => {
  var result = await OrderModel.find().sort({ "OrderDate": -1 });
  if (result.length === 0) res.status(200).send({ statuscode: 0 });
  else res.status(200).send({ statuscode: 1, orderdata: result });
});

app.put("/api/updateorderstatus", async (req, res) => {
  var updateresult = await OrderModel.updateOne({ _id: req.body.oid }, { $set: { status: req.body.newstatus } });
  if (updateresult.modifiedCount === 1) res.status(200).send({ statuscode: 1 });
  else res.status(200).send({ statuscode: 0 });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
