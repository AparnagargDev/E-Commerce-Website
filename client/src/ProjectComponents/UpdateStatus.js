import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";
function UpdateStatus() {
    const [newst,setnewst]=useState();
    const [params] = useSearchParams();
    const orderid = params.get("oid");
    const navigate = useNavigate();

    useEffect(()=>
        {
            if(sessionStorage.getItem("userdata")===null)
            {
                toast.warn("Please login to access the page");
                navigate("/login");
            }
            else
            {   
                var uinfo =JSON.parse(sessionStorage.getItem("userdata"));
                if(uinfo.usertype!=="admin")
                {
                    toast.warn("Please login to access the page");
                    navigate("/login");
                }
            }
        },[])
    async function onupdatestatus(e)
    {
        e.preventDefault();
        const updatedata = {newst,orderid};
        try
        {
            const resp =  await axios.put("http://localhost:9000/api/updatestatus",updatedata)
            if(resp.status===200)
            {
                if(resp.data.statuscode===0)
                {
                    toast.error("Error while updating status")
                }
                else if(resp.data.statuscode===1)
                {
                   toast.success("Status updated successfully")
                   navigate("/vieworders");
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
    

    return(
		<>
        <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Update Status</li>
                    </ol>
                </div>
            </div>
		
		 <div class="registration_form"></div>	
		 <div class="registration_left">
		<h2>Update Status</h2>
		 <div class="registration_form">
		 {/* <!-- Form --> */}
			 <form id="registration_form" name='loginform' onSubmit={onupdatestatus}>                 {/*action="contact.php" method="post"  */}
			
				<div>
					<label>
                    <select name="newstatus" className="form-control" onChange={(e)=>setnewst(e.target.value)}>
                            <option value="">Choose New Status</option>
                            <option>Confirmed</option>
                            <option>Shipped</option>
                            <option>In-Transit</option>
                            <option>Out for Delivery</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                            <option>Returned</option>
                        </select>    
                    </label>
						
				</div>
										
				<div>
					<input type="submit" value="Update" id="register-submit"/>
					
				</div>
				{/* <div class="forget">
					<a href="#">forgot your password</a>
				</div> */}
			</form>
			{/* <!-- /Form --> */}
			</div>
	</div>
	<div class="clearfix"></div>
		
		</>
	) 
	
}
export default UpdateStatus;