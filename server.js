const express = require('express')
const app = express()
const port = 9000
app.use(express.json());

const path = require('path'); // Include path module

const fs = require('fs');

var cors = require('cors')
app.use(cors())

const multer  = require('multer')

let mystorage = multer.diskStorage({
    destination: (req, file, cb) => 
    {
      cb(null, "public/uploads");//we will have to create folder ourselves
    },
    filename: (req, file, cb) => 
    {
        var picname = Date.now() + file.originalname;//1711956271167oil3.webp
        //milliseconds will be added with original filename and name will be stored in picname variable
        cb(null, picname);
    }
  });
  let upload = multer({ storage: mystorage });


const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/projectdb')
  .then(() => console.log('Connected to Mongodb!'));
  
var SignupSchema=mongoose.Schema({fullname:String,phoneno:String,email:{type:String,unique:true},pass:String,gender:String,usertype:String},{versionkey:false})
  var SignupModel=mongoose.model("signup",SignupSchema,"signup");
 

app.post("/api/signup",async(req,res)=>{
    //database coding
    var newrecord = new SignupModel({fullname:req.body.fullname,phoneno:req.body.phoneno,email:req.body.email,pass:req.body.pass,gender:req.body.gender,usertype:"normal"});
    // this will create a temporary record in model not in real collection
    var result = await newrecord.save()
    // it will save records in real collection
    // 
    if (result)
        {
            res.send({msg:"Signup Sucessful"});
        }
    else
    {
        res.send({msg:"Signup Failed"});
    }    


}

)
app.post("/api/login",async(req,res)=>{
    var result = await SignupModel.find({email:req.body.email,pass:req.body.password}).select("-pass");

    
    if(result.length===0)
    {
        res.status(200).send({statuscode:0})
    }
    else
    {
      res.status(200).send({statuscode:1,pdata:result[0]})
    }
}
)

app.put("/api/changepassword",async(req,res)=>
    {
        try
        {
            var updateresult = await SignupModel.updateOne({email: req.body.uemail,pass: req.body.currentpass}, { $set: {pass:req.body.newpass}});
    
            if(updateresult.modifiedCount===1)
            {
                res.status(200).send({statuscode:1})
            }
            else
            {
                res.status(200).send({statuscode:0})
            }
        }
        catch(e)
        {
            console.log(e);
            res.status(500).send({statuscode:-1,msg:"Some error occured"})
        }
    })

app.get("/api/searchuser",async(req,res)=>{
    var result = await SignupModel.find({email:req.query.email})

    if (result.length===0)
    {
        res.status(200).send({statuscode:0})
    }
    else
    {
        res.status(200).send({statuscode:1,searchdata:result})
    }
})

app.get("/api/getallusers",async(req,res)=>{
    var result = await SignupModel.find();
    //result will become an array because find function returns an array
    if (result.length===0)
    {
        res.status(200).send({statuscode:0})
    }
    else
    {
       res.status(200).send({statuscode:1,userdata:result})
    }
})

app.delete("/api/deluser/:uid",async(req,res)=>{
    var result = await SignupModel.deleteOne({_id:req.params.uid}) //{ acknowledged: true, deletedCount: 1 }
    if(result.deletedCount===1)
    {
        res.status(200).send({statuscode:1})
    }
    else
        {
            res.status(200).send({statuscode:0})
        }

})

var catSchema = mongoose.Schema({catname:String,catpic:String},{versionKey:false})

var CatModel = mongoose.model("category",catSchema,"category");// internal name, schema_name, real collection_name

app.post("/api/savecategory",upload.single('catpic'),async(req,res)=>
{
    var picturename;
    if(!req.file)
    {
        picturename="noimage.jpg";
    }
    else
    {
        picturename=req.file.filename;
    }
    var newrecord = new CatModel({catname:req.body.catname,catpic:picturename})    
    var result = await newrecord.save();
    if(result)
    {
        res.status(200).send({statuscode:1})
    }
    else
    {
        res.status(200).send({statuscode:0})
    }    
})

app.get("/api/getallcat",async(req,res)=>{
    var result = await CatModel.find();
    //result will become an array because find function returns an array
    if (result.length===0)
    {
        res.status(200).send({statuscode:0})
    }
    else
    {
       res.status(200).send({statuscode:1,catdata:result})
    }
})

app.put("/api/updatecategory",upload.single('catpic'),async(req,res)=>
    {
        
          var picturename;
          if(!req.file)
           {
              picturename=req.body.oldpicname; //it will save old picname in this variable
           }
        else
        {
            picturename=req.file.filename;
        }
        if(req.body.oldpicname!=="noimage.jpg")
        {
            fs.unlinkSync(`public/uploads/${req.body.oldpicname}`);
        }
        var updateresult = await CatModel.updateOne({_id:req.body.cid},{$set:{catname:req.body.catname,catpic:picturename}});    
        
        if(updateresult.modifiedCount===1)
        {
            res.status(200).send({statuscode:1})
        }
        else
        {
            res.status(200).send({statuscode:0})
        }
    
       
    })

var prodSchema = mongoose.Schema({catid:String,pname:String,Rate:Number,Discount:Number,Stock:Number,Description:String,picture:String,addedon:String},{versionKey:false})

var ProdModel = mongoose.model("product",prodSchema,"product");// internal name, schema_name, real collection_name

app.post("/api/saveproduct",upload.single('picture'),async(req,res)=>
{
    var picturename;
    if(!req.file)
    {
        picturename="noimage.jpg";
    }
    else
    {
        picturename=req.file.filename;
    }
    var newrecord = new ProdModel({catid:req.body.catid,pname:req.body.pname,Rate:req.body.rate,Discount:req.body.dis,Stock:req.body.stock,Description:req.body.descp,picture:picturename,addedon:new Date()}) 

    var result = await newrecord.save();

    if(result)
    {
        res.status(200).send({statuscode:1})
    }
    else
    {
        res.status(200).send({statuscode:0})
    }    
})

app.get("/api/fetchprodsbycatid",async(req,res)=>
{
    var result = await ProdModel.find({catid:req.query.cid})
    //result will become an array because find function returns an array
    if(result.length===0)
    {
        res.status(200).send({statuscode:0})
    }
    else
    {
        res.status(200).send({statuscode:1,proddata:result})
    }    
})

app.get("/api/fetchnewprods",async(req,res)=>
    {
        var result = await ProdModel.find().sort({"addedon":-1}).limit(5)
        //result will become an array because find function returns an array
        if(result.length===0)
        {
            res.status(200).send({statuscode:0})
        }
        else
        {
            res.status(200).send({statuscode:1,proddata:result})
        }    
    })

app.put("/api/updateproduct",upload.single('prodpic'),async(req,res)=>
{
    try
    {
        var picturename;
        if(!req.file)
        {
            picturename=req.body.oldpicname;//it will save current picname in this variable
        }
        else
        {
            picturename=req.file.filename;

            if(req.body.oldpicname!=="noimage.jpg")
            {
                fs.unlinkSync(`public/uploads/${req.body.oldpicname}`);
            }
        }

        var updateresult = await ProdModel.updateOne({_id:req.body.prodid}, { $set: {pname:req.body.prodname,picture:picturename,Rate:req.body.rate,Discount:req.body.dis,Stock:req.body.stock,Discription:req.body.descp}});
        
        console.log("Update Result:", updateresult);
        console.log("Product ID:", req.body.prodid);
        console.log("productname:", req.body.prodname);
        console.log("rate:", req.body.rate);

        if(updateresult.modifiedCount===1)
        {
            res.status(200).send({statuscode:1})
        }
        else
        {
            res.status(500).send({statuscode:0})
        }
    }
    catch(e)
    {
        console.log(e.message);
        res.status(500).send({statuscode:-1,msg:"Some error occured"})
    }
})

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


 app.delete("/api/delcat/:id",async(req,res)=>{
    // console.log(req.params.id)
        var result = await CatModel.deleteOne({_id:req.params.id}) //{ acknowledged: true, deletedCount: 1 }
        console.log(result)
        
        if(result.deletedCount===1)
        {
            res.status(200).send({statuscode:1})
        }
        else
            {
                res.status(200).send({statuscode:0})
            }
        })

app.delete("/api/delproduct/:id",async(req,res)=>{
    // console.log(req.params.id)
    var result = await ProdModel.deleteOne({_id:req.params.id}) //{ acknowledged: true, deletedCount: 1 }
    console.log(result)

    if(result.deletedCount===1)
    {
        res.status(200).send({statuscode:1})
    }
    else
        {
            res.status(200).send({statuscode:0})
        }
    })
        

        var cartSchema = mongoose.Schema({pid:String,picture:String,ProdName:String,Rate:Number,Qty:Number,TotalCost:Number,email:String},{versionKey:false})

        var CartModel = mongoose.model("cart",cartSchema,"cart");// internal name, schema_name, real collection_name
        
app.post("/api/savetocart",async(req,res)=>
        {
        
            var newrecord = new CartModel({pid:req.body.pid,picture:req.body.picture,ProdName:req.body.pname,Rate:req.body.rate,Qty:req.body.qty,TotalCost:req.body.tc,email:req.body.email}) 
        
            var result = await newrecord.save();
        
            if(result)
            {
                res.status(200).send({statuscode:1})
            }
            else
            {
                res.status(200).send({statuscode:0})
            }    
        }) 
        
app.get("/api/getcart",async(req,res)=>
{
    try
    {
        var result = await CartModel.find({email:req.query.uemail})
        //result will become an array because find function returns an array
        if(result.length===0)
        {
            res.status(200).send({statuscode:0})
        }
        else
        {
            res.status(200).send({statuscode:1,cartinfo:result})
        }
    }
    catch(e)
    {
        res.status(500).send({statuscode:-1,errmsg:e.message})
    }
})

app.delete("/api/delcartitem/:ciid",async(req,res)=>{
    try
    {
        var result = await CartModel.deleteOne({_id:req.params.ciid})
        if(result.deletedCount===1)
            {
                res.status(200).send({statuscode:1})
            }
            else
            {
                res.status(200).send({statuscode:0})
            }
    }
    catch
    {
        console.log(e);
        res.status(500).send({statuscode:-1,msg:"Some error occured"})
    }
})









var orderSchema = mongoose.Schema({state:String,city:String,pincode:String,area:String,billamt:Number,phoneno:String,name:String,email:String,OrderDate:String,PayMode:String,CardDetails:Object,OrderProducts:[Object],status:String},{versionKey:false})

var OrderModel = mongoose.model("finalorder",orderSchema,"finalorder");

app.post("/api/saveorder",async(req,res)=>
{

    var newrecord = new OrderModel({state:req.body.state,city:req.body.city,pincode:req.body.pincode,area:req.body.area,billamt:req.body.tbill,email:req.body.email,name:req.body.name,phoneno:req.body.phoneno,OrderDate:new Date(),PayMode:req.body.pmode,CardDetails:req.body.carddetails,OrderProducts:req.body.cartinfo,status:"Payment received, processing"}) 

    var result = await newrecord.save();

    if(result)
    {
        res.status(200).send({statuscode:1})
    }
    else
    {
        res.status(200).send({statuscode:0})
    }    
})

app.put("/api/updatestock",async(req,res)=>
{
    try
    {
        var cartdata = req.body.cartinfo;
        for(var x=0;x<cartdata.length;x++)
        {
            var updateresult = await ProdModel.updateOne({_id: cartdata[x].pid}, {$inc:{"Stock":-cartdata[x].Qty}});
        }
        if(updateresult.modifiedCount===1)
        {
            res.status(200).send({statuscode:1})
        }
        else
        {
            res.status(200).send({statuscode:0})
        }
    }
    catch(e)
    {
        console.log(e);
        res.status(500).send({statuscode:-1,msg:"Some error occured"})
    }
})

app.delete("/api/deletecart",async(req,res)=>
    {
        var result = await CartModel.deleteMany({email:req.query.un})//{ acknowledged: true, deletedCount: ... }
        if(result.deletedCount>=1)
        {
            res.status(200).send({statuscode:1})
        }
        else
        {
            res.status(200).send({statuscode:0})
        }    
    })

app.get("/api/getorderid",async(req,res)=>
{
    try
    {
        var result = await OrderModel.findOne({email:req.query.un}).sort({"OrderDate":-1});
        if(result)
        {
            res.status(200).send({statuscode:1,orderdata:result})
        }
        else
        {
            res.status(200).send({statuscode:0})
        }
    }
    catch(e)
    {
        res.status(500).send({statuscode:-1,errmsg:e.message})
    }
})
    
app.get("/api/getallorders",async(req,res)=>
{
    var result = await OrderModel.find().sort({"OrderDate":-1})
    //result will become an array because find function returns an array
    if(result.length===0)
    {
        res.status(200).send({statuscode:0})
    }
    else
    {
        res.status(200).send({statuscode:1,ordersdata:result})
    }    
})
app.get("/api/getorderproducts",async(req,res)=>
{
    try
    {
        var result = await OrderModel.findOne({_id:req.query.orderno});
        if(result.length===0)
        {
            res.status(200).send({statuscode:0})
        }
        else
        {
            res.status(200).send({statuscode:1,items:result.OrderProducts})
        }     
    }
    catch(e)
    {
        console.log(e.message);
        res.status(500).send({statuscode:-1,msg:"Some error occured"})   
    }  
})

app.put("/api/updatestatus",async(req,res)=>
{
    try
    {
        var updateresult = await OrderModel.updateOne({_id: req.body.orderid}, { $set: {status:req.body.newst}});

        if(updateresult.modifiedCount===1)
        {
            res.status(200).send({statuscode:1})
        }
        else
        {
            res.status(200).send({statuscode:0})
        }
    }
    catch(e)
    {
        console.log(e);
        res.status(500).send({statuscode:-1,msg:"Some error occured"})
    }
})

app.get("/api/getuserorders",async(req,res)=>
{
    var result = await OrderModel.find({email:req.query.un}).sort({"OrderDate":-1})

    if(result.length===0)
    {
        res.status(200).send({statuscode:0})
    }
    else
    {
        res.status(200).send({statuscode:1,ordersdata:result})
    }    
})

app.get("/api/searchproducts",async(req,res)=>
{
    try
    {
        var searchtext = req.query.q;
        var result = await ProdModel.find({pname: { $regex: '.*' + searchtext ,$options:'i' }})
        //result will become an array because find function returns an array
        if(result.length===0)
        {
            res.status(200).send({statuscode:0})
        }
        else
        {
            res.status(200).send({statuscode:1,proddata:result})
        }   
    }
    catch
    {
        console.log(e);
        res.status(500).send({statuscode:-1,msg:"Some error occured"})   
    }    
})    
    



app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
}

)