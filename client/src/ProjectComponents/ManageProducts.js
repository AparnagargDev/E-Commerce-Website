import axios from "axios";
import { useState,useEffect,useRef } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import './Home.css';
function ManageProduct() 
{
    const [catid,setcatid]=useState();
    const [pid,setpid]=useState();
    const [pname,setpname]=useState();
    const [picture,setpicture]=useState(null);
    const [rate,setrate]=useState([]);
    const [dis,setdis]=useState();
    const [stock,setstock]=useState();
    const [descp,setdescp]=useState();
    const fileInputRef = useRef(null);

    const [catdata,setcatdata]=useState([]);
    const [prodsdata,setprodsdata]=useState([]);

    const [picname,setpicname]=useState();
    const [editmode,seteditmode]=useState(false);
    const navigate = useNavigate

    useEffect(()=>
        {
            if(sessionStorage.getItem("userdata")===null)
            {
                toast.error("Please login to access the page");
                navigate("/login");
            }
            else
            {   
                var uinfo =JSON.parse(sessionStorage.getItem("userdata"));
                if(uinfo.usertype!=="admin")
                {
                    toast.error("Please login to access the page");
                    navigate("/login");
                }
            }
        },[])

    
    

    async function fetchallcat()
    {
        try
        {
           const resp = await axios.get("http://localhost:9000/api/getallcat")
		   if (resp.status===200)
		    {
			   if(resp.data.statuscode===1)
			     {
				   setcatdata(resp.data.catdata);
                   console.log("catdata is " ,catdata);
			     }
			  else
			    {
				     setcatdata([]);
			    }
		    }
		 else
		   {
			  toast.error("Oops!Something went wrong" ,{
                position: toast.POSITION.TOP_RIGHT
              });
		   }
        }
        catch(err)
        {
            toast.error(err.message);
        }
    }

    useEffect(()=>{
        fetchallcat();
    },[])

    useEffect(()=>
        {
            if(catid!=="")
            {
                fetchprodsbycat();
            }
        },[catid])

        async function fetchprodsbycat()
        {
            try
            {
                const resp =  await axios.get(`http://localhost:9000/api/fetchprodsbycatid?cid=${catid}`)
                if(resp.status===200)
                {
                    if(resp.data.statuscode===1)
                    {
                        setprodsdata(resp.data.proddata)
                    }
                    else
                    {
                        setprodsdata([]);
                        toast.info("No products found");
                    }
                }
                else
                {
                    alert("Some error occured")
                }
            }
            catch(err)
            {
                alert(err.message);
            }
        } 
        
        async function addproduct(e)
    {
        e.preventDefault();
        try
        {
            const formdata = new FormData();
            formdata.append("catid",catid)
            formdata.append("pname",pname)
            formdata.append("rate",rate)
            formdata.append("dis",dis)
            formdata.append("stock",stock)
            formdata.append("descp",descp)

            if(picture!==null)
            {
                formdata.append("picture",picture)
            }

            const resp =  await axios.post(`http://localhost:9000/api/saveproduct`,formdata)
            if(resp.status===200)
            {
               if(resp.data.statuscode===1)
               {
                   toast.success("Product added successfully")
                   oncancel()
                   fetchprodsbycat();
               }
               else  if(resp.data.statuscode===0)
                {
                    toast.warn("Product not added");
                }
            }
            else
            {
               alert("Some error occured");
            }
        }
        catch(err)
        {
            alert(err.message)
        }
    }



    async function updatedb()
    {
        try
        {
            const formdata = new FormData();
            formdata.append("prodname",pname)//either oldname or new name
            formdata.append("rate",rate)//either oldname or new name
            formdata.append("Discount",dis)//either oldname or new name
            formdata.append("Stock",stock)//either oldname or new name
            formdata.append("description",descp)//either oldname or new name
            

            if(picture!==null)
            {
                formdata.append("prodpic",picture)
            }
            formdata.append("oldpicname",picname)
            formdata.append("prodid",pid);
            console.log(formdata)

            const resp =  await axios.put(`http://localhost:9000/api/updateproduct`,formdata)
            if(resp.status===200)
            {
               if(resp.data.statuscode===1)
               {
                   toast.success("Product updated successfully")
                   oncancel();
                   fetchprodsbycat();
               }
               else  if(resp.data.statuscode===0)
                {
                    toast.warn("Product not updated");
                }
            }
            else
            {
               alert("Some error occured");
            }
         }
        catch(err)
        {
            alert(err.message)
        }
    }   


     async function ondelete(id)
     {
        console.log("Deleting category with ID:", id); // Check if ID is correct here
         
    
        var userresp=window.confirm("Are you sure you want to delete this product?");
        if(userresp===true)
        {
            const resp = await axios.delete(`http://localhost:9000/api/delproduct/${id}`);
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    toast.success("Product deleted sucessfully")
                    fetchprodsbycat();
                }
                else if(resp.data.statuscode===0)
                    {
                        toast.info("Product not deleted ")
                    }
            }
            else
            {
                  toast.error("Some error occured")
            }
        }
     }
    
     function onupdate(catitem)
     {
        seteditmode(true)
        setpname(catitem.pname)
        setpicname(catitem.picture)
        setpid(catitem._id);
        setcatid(catitem.catid)
        setrate(catitem.Rate)
        setdis(catitem.Discount)
        setstock(catitem.Stock)
        setdescp(catitem.Description)

     }
    function oncancel()
    {
        seteditmode(false);
        setpname("")
        setpicture("")
        setpid("");
        // setcatid("");
        setrate("");
        setdis("");
        setstock("");
        setdescp("");
        if (fileInputRef.current) 
        {
            fileInputRef.current.value = '';
        }
    }
    

    return (
        <>
          <div className="manage-category">
            <div className="breadcrumbs">
                <Link to="/homepage">Home</Link> &gt; <Link to="/addproduct">Manage Product</Link>
            </div>
            <div className="content">
		<h2>Manage Products</h2>
		 <div class="registration_form">
		 {/* <!-- Form --> */}
			 <form id="registration_form" name='loginform' onSubmit={addproduct}>                 {/*action="contact.php" method="post"  */}
			
				<div>
					<label>
						{/* <input name="catname" placeholder="Category Name" value={cname} type="text" tabindex="3" required="" onChange={(e)=>setcname(e.target.value)}/> */}
                        <select name="cat" className="form-control" onChange={(e)=>setcatid(e.target.value)}>
                        <option value="">Choose Category</option>
                        {
                            catdata.map((item,index)=>
                            <option value={item._id} key={index}>{item.catname}</option>
                            )
                        }
                       </select>
					</label>
                    </div>
                    

                <div>
					<label>
                    <input name="prodname" placeholder="Product Name" value={pname} type="text" tabindex="3" required="" onChange={(e)=>setpname(e.target.value)}/>
                    </label>
                </div>
                <div>
					<label>
                    <input name="rate" placeholder="Rate" value={rate} type="text" tabindex="3" required="" onChange={(e)=>setrate(e.target.value)}/>
                    </label>
                </div>
                <div>
					<label>
                    <input name="dis" placeholder="Discount(in percent, do not add % symbol)" value={dis} type="text" tabindex="3" required="" onChange={(e)=>setdis(e.target.value)}/>
                    </label>
                </div>
                <div>
					<label>
                    <input name="stock" placeholder="Stock" value={stock} type="text" tabindex="3" required="" onChange={(e)=>setstock(e.target.value)}/>
                    </label>
                </div>
                <div>
					<label>
                    <textarea name="des" placeholder="Description" value={descp} type="text" tabindex="3" required="" onChange={(e)=>setdescp(e.target.value)}></textarea>
                    </label>
                </div>

				
                {
                editmode?
                <>
                    <img src={`uploads/${picname}`} alt="" height='100'/>
                    Choose new image, if required
                </>:null
            }
				<div>
					<label>
						<input  type="file" tabindex="4" name="ppic" ref={fileInputRef}  onChange={(e)=>setpicture(e.target.files[0])}/>
					</label>
				</div>						
				<div>
				{editmode===false?<input type="submit" name="btn" value="Add" id="register-submit"/>:null}<br/>
                    {
                        editmode?
                        <>
                        <input type="button" name="btn2" value="Update" id="register-submit" onClick={updatedb}/><br/>
                        <input type="button" name="btn3" value="Cancel" id="register-submit" onClick={oncancel}/><br/>
                        </>:null
                    }
					
				</div>
				{/* <div class="forget">
					<a href="#">forgot your password</a>
				</div> */}
			</form>
			{/* <!-- /Form --> */}
			</div>
            </div>
            </div>
	
	<div className="table-container">

    {
            prodsdata.length>0?
            <>
            {/* <div className="container"></div> */}
            
            <table>
                <thead>
                    <tr >
                        <th >Pictures</th>
                        <th>Product Name</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                   {
                       prodsdata.map((item,index)=>
                        <tr key={index}>
                            <td><img src={`uploads/${item.picture}`}  height="100"  width="200" alt=""/></td>
                            <td>{item.pname}</td>
                            <td><button className="btn btn-primary" onClick={()=>onupdate(item)}>Update</button></td>
                            <td><button className="btn btn-danger" onClick={()=>ondelete(item._id)}>Delete</button></td>
                            
                        </tr>        
                       )

                    }
                    </tbody> 
                            
                
            </table>
            
            
            <big>{prodsdata.length} Products Found</big>
            </>:<h2>No Products Found</h2>
        }<br/>
        </div>
        
        </>
    )
 
}  
    export default ManageProduct;