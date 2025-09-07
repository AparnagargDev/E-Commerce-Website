
import axios from "axios";
import { useState,useEffect,useRef } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ManageCategory() 
{
    const [catid,setcatid]=useState();
    const [cname,setcname]=useState();
    const [cpic,setcpic]=useState(null);
    const [catdata,setcatdata]=useState([]);
    const [picname,setpicname]=useState();
    const [editmode,seteditmode]=useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate()

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
    
    async function addcategory(e)
    {
        e.preventDefault();
        try
        {
            const formdata = new FormData();
            formdata.append("catname",cname)
            if(cpic!==null)
                {
                    formdata.append("catpic",cpic)
                }
            
            const resp =  await axios.post(`http://localhost:9000/api/savecategory`,formdata)
            if(resp.status===200)
            {
               if(resp.data.statuscode===1)
               {
                    toast.success("Category added successfully!");
                    oncancel();
                    fetchallcat();
               }
               else  if(resp.data.statuscode===0)
                {
                     toast.info("Category not added");
                }
            }
            else
            {
               toast.error("Some error occured");
            }
        }
        catch(err)
        {
            toast.error(err.message)
        }
    }

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

    async function updatedb()
    {
        try
        {
            const formdata = new FormData();
            formdata.append("catname",cname)//either oldname or new name

            if(cpic!==null)
            {
                formdata.append("catpic",cpic)
            }
            formdata.append("oldpicname",picname)
            formdata.append("cid",catid);
            const resp =  await axios.put(`http://localhost:9000/api/updatecategory`,formdata)
            if(resp.status===200)
            {
               if(resp.data.statuscode===1)
               {
                   toast.success("Category updated successfully")
                   oncancel();
                   fetchallcat();
               }
               else  if(resp.data.statuscode===0)
                {
                    toast.warn("Category not updated");
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
         
    
        var userresp=window.confirm("Are you sure you want to delete this category?");
        if(userresp===true)
        {
            const resp = await axios.delete(`http://localhost:9000/api/delcat/${id}`);
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    toast.success("Category deleted sucessfully")
                    fetchallcat();
                }
                else if(resp.data.statuscode===0)
                    {
                        toast.info("Category not deleted ")
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
        setcname(catitem.catname)
        setpicname(catitem.catpic)
        setcatid(catitem._id);
    }
    function oncancel()
    {
        seteditmode(false);
        setcname("")
        setpicname("")
        setcpic(null);
        setcatid("");
        if (fileInputRef.current) 
        {
            fileInputRef.current.value = '';
        }
    }
    

    return (
        <>
            <div className="manage-category">
            <div className="breadcrumbs">
                <Link to="/homepage">Home</Link> &gt; <Link to="/addcategory">Manage Category</Link>
            </div>
            <div className="content">
           {/* <div class="registration_form">	
           <div class="registration_left"> */}
		<h2>Manage Category</h2>
		 <div class="registration_form">
		 {/* <!-- Form --> */}
			 <form id="registration_form" name='loginform' onSubmit={addcategory}>                 {/*action="contact.php" method="post"  */}
			
				<div>
					<label>
						<input name="catname" placeholder="Category Name" value={cname} type="text" tabindex="3" required="" onChange={(e)=>setcname(e.target.value)}/>
					</label>
				</div>
                {
                editmode?
                <>
                    <img src={`${picname}`} alt="" height="50" width="100"/>
                    <p>Choose new image, if required</p>
                </>:null
            }
				<div>
					<label>
						<input  type="file" tabindex="4" name="catpic" ref={fileInputRef}  onChange={(e)=>setcpic(e.target.files[0])}/>
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
            catdata.length>0?
            <>
            {/* <div className="container"></div> */}
            
            <table   >
            <thead>
                    <tr >
                        <th>Pictures</th>
                        <th>Category Name</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    </thead>  
                <tbody> 
                   {
                       catdata.map((item,index)=>
                        <tr key={index}>
                            <td><img src={`${item.catpic}`}  height="100"  width="200" alt=""/></td>
                            <td>{item.catname}</td>
                            <td><button className="btn btn-primary" onClick={()=>onupdate(item)}>Update</button></td>
                            <td><button className="btn btn-danger" onClick={()=>ondelete(item._id)}>Delete</button></td>
                            
                        </tr>        
                       )

                    }
                    </tbody>
                            
                
            </table>
            
            <big>{catdata.length} Categories Found</big>
            </>:<h2>No Categories Found</h2>
        }
        
        </div>
        
        </>
    )
 
}  
    export default ManageCategory;