import axios from 'axios';
import {useContext, useState} from 'react';
import { toast } from "react-toastify";
import { userContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
function Register()
{
	const [fullname,setfullname]=useState();
	const [phoneno,setphoneno]=useState();
	const [email,setemail]=useState();
	const [pass,setpass]=useState();
	const [password,setpassword]=useState();
	const [cpass,setcpass]=useState();
	const [gender,setgender]=useState();
	const [terms,setterms]=useState();
	const [msg,setmsg]=useState();
	const navigate = useNavigate();


	const {setudata} = useContext(userContext)

	async function onregister(e)
	{
		e.preventDefault();//it will prevent form from getting submit
		if(terms===true)
			{
				if(pass===cpass)
					{
						const regdata={fullname,phoneno,email,pass,gender}
						try
		               {
			             const resp=await axios.post("http://localhost:9000/api/signup",regdata)
			             toast.success(resp.data.msg)
						}
					   catch(e)
		               {
                         toast.error(e.message)
		               }
						
					}
				else
				{
					toast.info("Password and confirmpass doesn't match" )
				}
					
			}
		else
		{
			toast.info("Please accept terms and conditions")
		}
		
			
	}

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
        <div class="registration">
		<div class="registration_left">
		<h2>new user? <span> create an account </span></h2>
		{/* <!-- [if IE] 
		    < link rel='stylesheet' type='text/css' href='ie.css'/>  
		 [endif] -->   */}
		  
		{/* <!-- [if lt IE 7]>  
		    < link rel='stylesheet' type='text/css' href='ie6.css'/>  
		<! [endif] -->   */}
		<script>
			{/* (function() {
		
			 // Create input element for testing
 		   var  inputs = document.createElement('input');
			
 			// Create the supports object
 			 var supports = {};
			
 			 supports.autofocus   = 'autofocus' in inputs; 			
			 supports.required    = 'required' in inputs;
 			 supports.placeholder = 'placeholder' in inputs;
		
 			// Fallback for autofocus attribute  			
			if(!supports.autofocus) { 
				
 			}
			
// 			// Fallback for required attribute
 			if(!supports.required) {

			}
		
 			// Fallback for placeholder attribute
           if(!supports.placeholder) {
				 } 			
			
// 			// Change text inside send button on submit
 			var send = document.getElementById('register-submit');
 			if(send) { 
				send.onclick = function () {
					this.innerHTML = '...Sending';
				}
 			}
		
		
        
 }) () */}
		</script>
		 <div class="registration_form">
		 {/* <!-- Form --> */}
			<form /*id="registration_form" action="contact.php" method="post"*/ onSubmit={onregister}>
				<div>
					<label>
						<input placeholder="Full name:" type="text" tabindex="1" required autofocus onChange={(e)=>setfullname(e.target.value)}/>
					</label>
				</div>
				<div>
					<label>
						<input placeholder="Mobile Number" type="tel" tabindex="2" required autofocus onChange={(e)=>setphoneno(e.target.value)}/>
					</label>
				</div>
				<div>
					<label>
						<input placeholder="Email address:" type="email" tabindex="3" required onChange={(e)=>setemail(e.target.value)}/>
					</label>
				</div>
				<div class="sky-form">
					<div class="sky_form1">
						<ul>
							<li><label class="radio left"><input type="radio" name="radio"  value="male" onChange={(e)=>setgender(e.target.value)}/><i></i>Male</label></li>
							<li><label class="radio"><input type="radio" name="radio" value="female" onChange={(e)=>setgender(e.target.value)}/><i></i>Female</label></li>
							<div class="clearfix"></div>
						</ul>
					</div>
				</div>
				<div>
					<label>
						<input placeholder="Password" type="password" tabindex="4" required onChange={(e)=>setpass(e.target.value)}/>
					</label>
				</div>						
				<div>
					<label>
						<input placeholder="Confirm password" type="password" tabindex="4" required onChange={(e)=>setcpass(e.target.value)}/>
					</label>
				</div>
                <div class="sky-form">
					<label class="checkbox"><input type="checkbox" name="checkbox" onChange={(e)=>setterms(e.target.checked)} /><i></i>I agree to the terms and conditions &nbsp;<Link to="/terms" class="terms" > terms of service</Link> </label>
				</div>
				<div>
					<input type="submit" value="create an account" id="register-submit" name="btn"/><br/><br/>
					<h4>{msg}</h4>
				</div>
				
			</form>
			{/* <!-- /Form --> */}
		</div>
	</div>
	<div class="registration_left">
		<h2>existing user</h2>
		 <div class="registration_form">
		 {/* <!-- Form --> */}
			<form id="registration_form"  name ="loginform" onSubmit={onlogin}>
				<div>
					<label>
						<input placeholder="email:" type="email" tabindex="3" required onChange={(e)=>setemail(e.target.value)}/>
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
	<div class="clearfix"></div>
	</div>
	{/* <!-- end registration --> */}


        </>
    )
}
export default Register;