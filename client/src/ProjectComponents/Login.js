import axios from 'axios';
import {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { userContext } from '../App';
import { toast } from 'react-toastify';
import './Home.css';
function Login()
{
    const [email,setemail]=useState();
    const [password,setpassword]=useState();
    
    const navigate = useNavigate();

	const {setudata} = useContext(userContext);

    async function onlogin(e)
    {
        e.preventDefault()  //this function prevents form from getting submit

		const logindata={email,password}
		try
		{
		const resp = await axios.post("http://localhost:9000/api/login",logindata)
		if (resp.status===200)
		{
			if(resp.data.statuscode===0)
			{
				toast.info("email or password doesn't match");
			}
			else if(resp.data.statuscode===1)
			{
				setudata(resp.data.pdata);
				sessionStorage.setItem("userdata",JSON.stringify(resp.data.pdata));
				
				navigate("/homepage");
			}
		}
		else
		{
			toast.error("some error occured");
		}
    }
	catch(err)
	{
		toast.error(err.message);
	}
}
    

    return(
		<>
		
		
		
		 <div class="registration_form">	
		 <div class="registration_left">
		<h2>Login here</h2>
		 <div class="registration_form">
		 {/* <!-- Form --> */}
			 <form id="registration_form" name='loginform' onSubmit={onlogin}>                 {/*action="contact.php" method="post"  */}
			
				<div>
					<label>
						<input placeholder="Email" type="email" tabindex="3" required onChange={(e)=>setemail(e.target.value)}/>
					</label>
				</div>
				<div>
					<label>
						<input placeholder="Password" type="password" tabindex="4" required onChange={(e)=>setpassword(e.target.value)}/>
					</label>
				</div>						
				<div>
					<input type="submit" value="sign in" id="register-submit"/>
					
				</div>
				{/* <div class="forget">
					<a href="#">forgot your password</a>
				</div> */}
			</form>
			{/* <!-- /Form --> */}
			</div>
			</div>
			</div>
	
	
	
	<div class="clearfix"></div>
		
		</>
	) 
	
}
export default Login;