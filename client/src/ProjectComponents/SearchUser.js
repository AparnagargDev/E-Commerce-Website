import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function SearchUser()
{
    const [email,setemail]=useState();
    const [msg,setmsg]=useState();
    const [flag,setflag]=useState();
	const [udata,setudata]=useState({});
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
    
    async function searchuser(e)
    {
        e.preventDefault()  //this function prevents form from getting submit
		try
		{

		
		  const resp = await axios.get(`http://localhost:9000/api/searchuser?email=${email}`)
		  if (resp.status===200)
		  {
			if(resp.data.statuscode===0)
			{
				setmsg("Incorrect email");
				setflag(false);
			}
			else
			{
			    setflag(true);
				setudata(resp.data.searchdata[0]);	
			}
		  }
		 else
		 {
			setmsg("some error occured");
		 }
	  }
	  catch(err)
	  {
		setmsg(err.message)
	  }
    }
    

    return(
		<>
		
		 <div class="registration_form"></div>	
		 <div class="registration_left">
		<h2>Search User</h2>
		 <div class="registration_form">
		 {/* <!-- Form --> */}
			 <form id="registration_form" name='searchform' onSubmit={searchuser}>                 {/*action="contact.php" method="post"  */}
			
				<div>
					<label>
						<input placeholder="email:" type="email" tabindex="3" required onChange={(e)=>setemail(e.target.value)}/>
					</label>
				</div>
										
				<div>
					<input type="submit" value="Search" id="register-submit"/><br/>
					{msg}
					{
						flag?
						<>
						<b>Name : </b>{udata.fullname}<br/>
						<b>PhoneNumber : </b>{udata.phoneno}
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
	<div class="clearfix"></div>
		
		</>
	) 
	
}
export default SearchUser;