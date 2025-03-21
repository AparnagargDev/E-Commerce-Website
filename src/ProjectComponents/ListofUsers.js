import './Home.css';
import axios from 'axios';
import {useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function ListofUsers()
{
    const [membersdata,setmembersdata]=useState([]);
    
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

    

    async function fetchusers()
    {
        try
        {
           const resp = await axios.get("http://localhost:9000/api/getallusers")
		   if (resp.status===200)
		    {
			   if(resp.data.statuscode===1)
			     {
				   setmembersdata(resp.data.userdata);
			     }
			  else
			    {
				     setmembersdata([]);
			    }
		    }
		 else
		   {
			  toast.error("some error occured");
		   }
        }
        catch(err)
        {
            toast.error(err.message)
        }
    }

    useEffect(()=>{
        fetchusers();
    },[])

     async function onmemdel(id)
    {
        var userresp=window.confirm("Are you sure to delete");
        if(userresp===true)
        {
            const resp = await axios.delete(`http://localhost:9000/api/deluser/${id}`);
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    alert("User deleted sucessfully")
                    fetchusers();
                }
                else if(resp.data.statuscode===0)
                    {
                        alert("User not deleted ")
                    }
            }
            else
            {
                  alert("Some error occured")
            }
        }
    }
    
    return(
        <>
        
        <div className="container">
         {
            membersdata.length>0?
            <>
            {/* <div className="container"></div> */}
            <table  className="user-table">
                <thead> 
                    <tr >
                        <th> Name</th>
                        <th>Phone number</th>
                        <th>email</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                       membersdata.map((data,index)=>
                        <tr key={data}>
                            <td>{data.fullname}</td>
                            <td>{data.phoneno}</td>
                            <td>{data.email}</td>
                            <td><button className="btn btn-danger" onClick={()=>onmemdel(data._id)}>Delete</button></td>

                        </tr>        
                       )

                    } 
                    </tbody>
                
            </table>
            <p className="record-count">  {membersdata.length} records Found</p>
            </>:<h2>No Users Found</h2>
        }
        
        </div>
        

       
        </>
    )
}
export default ListofUsers;