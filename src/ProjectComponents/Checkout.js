import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { userContext } from "../App";
import { toast } from "react-toastify";
function Checkout() {
    const [state,setstate]=useState();
    const [city,setcity]=useState();
    const [pincode,setpincode]=useState();
    const [area,setarea]=useState();
    const [hname,sethname]=useState();
    const [ccno,setccno]=useState();
    const [exp,setexp]=useState();
    const [cvv,setcvv]=useState();

    const [flag,setflag]=useState(false);
    const [pmode,setpmode]=useState("");
    const navigate = useNavigate();

    const {udata} = useContext(userContext);

    useEffect(()=>
        {
            if(sessionStorage.getItem("userdata")===null)
            {
                toast.error("Please login to access the page");
               navigate("/login");
            }
        },[])

    async function oncheckout(e)
    {
        e.preventDefault();
        const carddetails = {hname,ccno,exp,cvv}
        const cartinfo = JSON.parse(sessionStorage.getItem("cartdata"));
        
        const checkoutdata = {state,city,pincode,area,tbill:sessionStorage.getItem("tbill"),email:udata.email,phoneno:udata.phoneno,name:udata.fullname,pmode,carddetails,cartinfo};
        try
        {
            const resp =  await axios.post("http://localhost:9000/api/saveorder",checkoutdata)
            if(resp.status===200)
            {
                if(resp.data.statuscode===0)
                {
                    toast.error("Error while making the payment");
                }
                else if(resp.data.statuscode===1)
                {
                    updatestock();
                }
            }
            else
            {
                toast.error("Some error occured");
            }
        }
        catch(err)
        {
            toast.error(err.message);
        }
    }

    useEffect(()=>
    {
        if(pmode!=="")
        {
            if(pmode==="Debit Card / Credit Card")
            {
                setflag(true);
            }
            else if(pmode==="Cash on Delivery")
            {
                setflag(false);
            }
        }
        else
        {
            setflag(false);
        }   
    },[pmode])
    async function updatestock()
    {
        const cartinfo = {cartinfo:JSON.parse(sessionStorage.getItem("cartdata"))};
        try
        {
            const resp =  await axios.put("http://localhost:9000/api/updatestock",cartinfo)
            if(resp.status===200)
            {
                if(resp.data.statuscode===0)
                {
                   toast.error("Error while updating stock")
                }
                else if(resp.data.statuscode===1)
                {
                    emptycart();
                }
            }
            else
            {
                toast.error("Some error occured");
            }
        }
        catch(err)
        {
            toast.error(err.message);
        }
    }
    async function emptycart()
    {
        try
        {
            const resp =  await axios.delete("http://localhost:9000/api/deletecart?un=" + udata.email)
            if(resp.status===200)
            {
                if(resp.data.statuscode===0)
                {
                   toast.error("Error while deleting cart")
                }
                else if(resp.data.statuscode===1)
                {
                    sessionStorage.removeItem("cartdata");
                    navigate("/ordersummary");
                }
            }
            else
            {
                toast.error("Some error occured");
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
		<h2>Address</h2>
		 <div class="registration_form">
		 {/* <!-- Form --> */}
			 <form id="registration_form" name='loginform' onSubmit={oncheckout}>                 {/*action="contact.php" method="post"  */}
			
				<div>
					<label>
						<input placeholder="State" type="text" tabindex="3" required onChange={(e)=>setstate(e.target.value)}/>
					</label>
				</div>
				<div>
					<label>
						<input placeholder="City" type="text" tabindex="4" required onChange={(e)=>setcity(e.target.value)}/>
					</label>
				</div>						
				<div>
					<label>
						<input placeholder="Pincode" type="tel" tabindex="4" required onChange={(e)=>setpincode(e.target.value)}/>
					</label>
				</div>						
				<div>
					<label>
						<input placeholder="Area/Colony/Road name" type="text" tabindex="4" required onChange={(e)=>setarea(e.target.value)}/>
					</label>
				</div>						
				<div>
					<label>
                    <select name="pmode" className="form-control" onChange={(e)=>setpmode(e.target.value)}>
                        <option value="">Choose Payment Mode</option>
                        <option>Cash on Delivery</option>
                        <option>Debit Card / Credit Card</option>
                    </select>
                    </label>
                </div>    
                    {
                        flag===true?
                        <>
                        <div>
                            <label>
                            <input type="text" name="hname" placeholder="Holder Name" onChange={(e)=>sethname(e.target.value)}/>
                            </label>
				        </div>
                        <div>
                            <label>
                            <input type="text" name="cardno" placeholder="Card Number" onChange={(e)=>setccno(e.target.value)}/><br/>
                            </label>
				        </div>
                        <div>
                            <label>
                            <input type="text" name="expdt" placeholder="Expiry Date" onChange={(e)=>setexp(e.target.value)}/>
                            </label>
				        </div>
                        <div>
                            <label>
                            <input type="password" name="cvv" placeholder="CVV" onChange={(e)=>setcvv(e.target.value)}/>
                            </label>
				        </div>
                        </>:null
                    }
											
				<div>
					<input type="submit" value="Make Payment" id="register-submit"/>
					
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
export default Checkout;