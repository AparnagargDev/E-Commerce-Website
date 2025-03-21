import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { userContext } from "../App";


function Details()
{
    const [params] = useSearchParams();
    const prodid = params.get("pid");
    const [proddata,setproddata] = useState({});
	const [remcost,setremcost] = useState();
    const [qty,setqty] = useState();
    const [tc,settc] = useState();
    const [stock,setstock] = useState([]);
    const navigate = useNavigate();

	const {udata} = useContext(userContext);
    useEffect(()=>
    {
        fetchproddetails();
    },[prodid])

	useEffect(()=>
		{
			setremcost(proddata.Rate-(proddata.Discount*proddata.Rate)/100);
			// setremcost(80-(10*80)/100);
	
			var stock2=[];
			if(proddata.Stock>10)
			{
				for(var x=1;x<=10;x++)
				{
					stock2.push(x);//1-10
				}
			}
			else
			{
				for(var x=1;x<=proddata.Stock;x++)
				{
					stock2.push(x);//1-5
				}
			}
			setstock(stock2);
		},[proddata])

		useEffect(()=>
			{
				settc(remcost*qty);
			},[qty])

    async function fetchproddetails()
    {
        try
        {
            const resp =  await axios.get(`http://localhost:9000/api/getproddetails?pid=${prodid}`)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setproddata(resp.data.proddata)
                }
                else
                {
                    setproddata([]);
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

	async function addtocart()
    {
    //    if(sessionStorage.getItem("userdata")===null)
    //    {
    //        toast.info("Please login to add to cart");
            // navigate("/login");
    //    }
        if(udata===null)
        {
            toast.info("Please login to add to cart");
            navigate("/login");
        }
       else
       {
            const cartdata = {pid:proddata._id,picture:proddata.picture,pname:proddata.pname,rate:remcost,qty:qty,tc:tc,email:udata.email}
            try
            {
                const resp =  await axios.post("http://localhost:9000/api/savetocart",cartdata)
                if(resp.status===200)
                {
                    if(resp.data.statuscode===0)
                    {
                        toast.warning("Problem while adding to cart, try again")
                    }
                    else if(resp.data.statuscode===1)
                    {
                       navigate("/showcart");
                    }
                }
                else
                {
                    toast.warning("Problem while adding to cart, try again")
                }
            }
            catch(err)
            {
                toast.warning(err.message)
            }
       }
    }


	

    return(
        <>
        <div className="container">
<div className="women_main">
	{/* <!-- start content --> */}
			<div className="row single">
				<div className="col-md-9 det">
				  <div className="single_left">
					<div className="grid images_3_of_2">
						<ul id="etalage">
							<li>
							<img className="etalage_thumb_image img-responsive" src={`uploads/${proddata.picture}`} alt="" />
							</li>
							
						</ul>
						 <div className="clearfix"></div>		
				  </div>
				  <div className="desc1 span_3_of_2">
					<h3>{proddata.pname}</h3>
					{/* <span className="brand">Brand: <a href="#">Sed do eiusmod </a></span>
					<br/>
					<span className="code">Product Code: Product 11</span>
					<p>when an unknown printer took a galley of type and scrambled it to make</p> */}
						<div className="price"></div>
							<span className="text">Price:</span>
							<span className="price-new">₹{remcost}</span><span className="price-old">₹{proddata.Rate} </span><br/><br/> 
							{/* <span className="price-tax">Ex Tax: $90.00</span> */}
							{/* <span className="points"><small>Price in reward points: 400</small></span> */}
                            
                            </div>
						</div>
					<div className="det_nav1">
						{/* <h4>Select a size :</h4>
							<div className=" sky-form col col-4">
							
							<ul>

									<li><label className="checkbox"><input type="checkbox" name="checkbox"/><i></i>L</label></li>
									<li><label className="checkbox"><input type="checkbox" name="checkbox"/><i></i>S</label></li>
									<li><label className="checkbox"><input type="checkbox" name="checkbox"/><i></i>M</label></li>
									<li><label className="checkbox"><input type="checkbox" name="checkbox"/><i></i>XL</label></li>
								</ul>
							</div> */}
							{
                               proddata.Stock>0?
                               <select name="qty" requried="" onChange={(e)=>setqty(e.target.value)}>
                                <option value="">Choose Quantity</option>
                                    {
                                      stock.map((item,index)=>
                                    <option key={index}>{item}</option>
									  )
                                      }
                                    </select>:<b>Out of Stock</b>
							}
							
							
					</div>
					<form className="btn_form">
					<input  type="button" className="btn btn-primary" name="add" value="Add to cart" onClick={addtocart}  />
					</form>
						
					</div>
					{/* <a href="#"><span>login to save in wishlist </span></a> */}
					
			   	 </div>
          	    <div className="clearfix"></div>
          	   </div>
          	    <div className="single-bottom1">
					<h6>Description</h6>
					<p className="prod-desc">{proddata.Description}</p>
				</div>
                </div>
				
                
                
        </>
    )
}
export default Details;