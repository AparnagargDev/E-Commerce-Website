import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { userContext } from '../App';
import { toast } from 'react-toastify';
function ChangePassword()
{
    const [currentpass,setcurrentpass]=useState();
    const [newpass,setnewpass]=useState();
    const [cnewpass,setcnewpass]=useState();
    const [msg,setmsg]=useState();
    const navigate = useNavigate();

	const {udata,setudata} = useContext(userContext);

	useEffect(()=>
		{
			if(sessionStorage.getItem("userdata")===null)
			{
				toast.error("Please login to access the page");
			   navigate("/login");
			}
		},[])

    async function onlogin(e)
    {
        e.preventDefault()  //this function prevents form from getting submit

		const uemail = udata.email
        const apidata = {currentpass,newpass,uemail}
		try
		{
            if(newpass===cnewpass)
            {   
		      const resp = await axios.put("http://localhost:9000/api/changepassword",apidata)
		      if (resp.status===200)
		        {
                    if(resp.data.statuscode===0)
                    {
                        toast.warning("Current Password is Incorrrect");
                    }
                    else if(resp.data.statuscode===1)
                    {
                        toast.success("Password changed successfully")
                        setudata(null);
                        sessionStorage.clear();
                        navigate("/homepage");
                    }
                }    
             else
               {
                toast.error("some error occured");
               }
		    }
		   else
            {
                toast.warning("New Password and confirm new password does not match") 
            }
    }
	catch(err)
	{
		toast.error(err.message);
	}
}
    

    return(
		<>
		
		 <div class="registration_form"></div>	
		 <div class="registration_left">
		<h2>Login here</h2>
		 <div class="registration_form">
		 {/* <!-- Form --> */}
			 <form id="registration_form" name='loginform' onSubmit={onlogin}>                 {/*action="contact.php" method="post"  */}
			
				<div>
					<label>
						<input placeholder="Current Password:" type="Password" tabindex="3" required onChange={(e)=>setcurrentpass(e.target.value)}/>
					</label>
				</div>
				<div>
					<label>
						<input placeholder=" New Password" type="password" tabindex="4" required onChange={(e)=>setnewpass(e.target.value)}/>
					</label>
				</div>						
				<div>
					<label>
						<input placeholder=" Confirm new password" type="password" tabindex="4" required onChange={(e)=>setcnewpass(e.target.value)}/>
					</label>
				</div>						
				<div>
					<input type="submit" value="Change Password" id="register-submit"/>
					{msg}
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
export default ChangePassword;