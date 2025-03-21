import {Link, useNavigate} from 'react-router-dom';
import { userContext } from '../App';
import { useContext, useState } from 'react';
function Header()
{
	const {udata,setudata} = useContext(userContext); 
	const navigate = useNavigate();
	const [sterm,setsterm] = useState();
	function onlogout()
	{
		setudata(null);
		sessionStorage.clear();
		navigate('/');
	} 
	function onsearch(e)
    {
		e.preventDefault()
        navigate("/searchresults?s=" + sterm);
    } 
	return(
        <>
        <div className="top_bg">
	<div className="container">
		<div className="header_top">
			<div className="top_right">
				{/* <ul>
					<li><a href="#">help</a></li>|
					<li><a href="contact.html">Contact</a></li>|
					<li><a href="#">Delivery information</a></li>
				</ul> */}
			</div>
			<div className="top_left">
				{
					udata===null?
				<h2> Welcome Guest </h2>:
				<h2> Welcome&nbsp;&nbsp;{udata.fullname} </h2>
                }
			</div>
				<div className="clearfix"> </div>
		</div>
	</div>
</div>
{/* <!-- header --> */}
<div className="header_bg">
<div className="container">
	<div className="header">
	<div className="head-t">
		<div className="logo">
			<a href="index.html"><img src="images/logo.png" className="img-responsive" alt=""/> </a>
		</div>
		{/* <!-- start header_right --> */}
		<div className="header_right">
			<div className="rgt-bottom">
				<div className="log">
					<div className="create_btn" >
						{
							udata===null?
							<>
						<div id="loginContainer"><Link to= "/login" id="loginButton"><span>Login</span></Link></div></>:<>
						<div id="loginContainer"><button className="btn btn-primary" onClick={onlogout}>Logout</button></div></>
					   }
						    {/* <div id="loginBox">                
						        <form id="loginForm">
						                <fieldset id="body">
						                	<fieldset>
						                          <label for="email">Email Address</label>
						                          <input type="text" name="email" id="email"/>
						                    </fieldset>
						                    <fieldset>
						                            <label for="password">Password</label>
						                            <input type="password" name="password" id="password"/>
						                     </fieldset>
						                    <input type="submit" id="login" value="Sign in"/>
						                	<label for="checkbox"><input type="checkbox" id="checkbox"/> <i>Remember me</i></label>
						            	</fieldset>
						            <span><a href="#">Forgot your password?</a></span>
								</form>
							</div> */}
						
					</div>
				</div>
				<div className="cart box_1">
					{
						udata===null?
				<Link to = "/Register">REGISTER</Link>:<>
				<div id="loginContainer"><Link to = "/changepassword" id="loginButton">Change Password</Link></div>
				</>
		        
				}
				</div>
			<div className="cart box_1">
				<a href="checkout.html">
					<h3>
					{
						udata!==null?
						<>
                         <Link to = "/orderhistory">Your Orders</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						 <Link to="/showcart"> <img src="images/bag.png" alt=""/>&nbsp;Cart</Link></>:null
					}
					</h3>
						

					
				</a>	
				<p><a href="javascript:;" className="simpleCart_empty"></a></p>
				<div className="clearfix"> </div>
			</div>
		
			
				{
                  udata.usertype!=="admin"?
				  <>
                   <div className="create_btn">
			      <Link to="/checkout">CHECKOUT</Link>
			      </div></>:null
				  
				} 
                
				
				
				

			
			
				
			

			
			
			<div className="clearfix"> </div>
		</div>
		<div className="search">
			<form>
				<input type="text" name="Search"  placeholder="Search for Product..."onChange={(e)=>setsterm(e.target.value)} />
				<input type="submit" value="" onClick={onsearch} />
			</form>
		    </div>
		<div className="clearfix"> </div>
		</div>
		<div className="clearfix"> </div>
	</div>
		{/* <!-- start header menu --> */}
		<ul className="megamenu skyblue">
			<li className="active grid"><Link  className="color1" to="/homepage">Home</Link></li>
			<li className="grid"><Link to="/addcategory"className="color2"> Manage Category</Link>
				{/* <div className="megapanel">
					<div className="row"> */}
						{/* <div className="col1">
							<div className="h_nav">
								<h4>Clothing</h4>
								<ul>
									<li><a href="women.html">Products</a></li>
									<li><a href="women.html">men</a></li>
									<li><a href="women.html">women</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">brands</a></li>
								</ul>	
							</div>							
						</div> */}
						{/* <div className="col1">
							<div className="h_nav">
								<h4>kids</h4>
								<ul>
									<li><a href="women.html">Pools&Tees</a></li>
									<li><a href="women.html">shirts</a></li>
									<li><a href="women.html">shorts</a></li>
									<li><a href="women.html">twinsets</a></li>
									<li><a href="women.html">kurts</a></li>
									<li><a href="women.html">jackets</a></li>
								</ul>	
							</div>							
						</div> */}
						{/* <div className="col1">
							<div className="h_nav">
								<h4>Bags</h4>
								<ul>
									<li><a href="women.html">Handbag</a></li>
									<li><a href="women.html">Slingbags</a></li>
									<li><a href="women.html">Clutches</a></li>
									<li><a href="women.html">Totes</a></li>
									<li><a href="women.html">Wallets</a></li>
									<li><a href="women.html">Laptopbags</a></li>
								</ul>	
							</div>												
						</div> */}
						{/* <div className="col1">
							<div className="h_nav">
								<h4>account</h4>
								<ul>
									<li><a href="#">login</a></li>
									<li><a href="register.html">create an account</a></li>
									<li><a href="women.html">create wishlist</a></li>
									<li><a href="women.html">my shopping bag</a></li>
									<li><a href="women.html">brands</a></li>
									<li><a href="women.html">create wishlist</a></li>
								</ul>	
							</div>						 */}
						{/* </div>
						<div className="col1">
							<div className="h_nav">
								<h4>Accessories</h4>
								<ul>
									<li><a href="women.html">Belts</a></li>
									<li><a href="women.html">Pens</a></li>
									<li><a href="women.html">Eyeglasses</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">Watches</a></li>
									<li><a href="women.html">Jewellery</a></li>
								</ul>	
							</div> */}
						{/* </div>
						<div className="col1">
							<div className="h_nav">
								<h4>Footwear</h4>
								<ul>
									<li><a href="women.html">new arrivals</a></li>
									<li><a href="women.html">men</a></li>
									<li><a href="women.html">women</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">style videos</a></li>
								</ul>	
							</div>
						</div> */}
					{/* </div>
					<div className="row">
						<div className="col2"></div>
						<div className="col1"></div>
						<div className="col1"></div>
						<div className="col1"></div>
						<div className="col1"></div>
					</div>
    				</div>*/}
				</li> 
			<li><Link to="/addproduct" className="color4" >Manage Product</Link></li>
				{/* <div className="megapanel">
					<div className="row">
						<div className="col1">
							<div className="h_nav">
								<h4>Clothing</h4>
								<ul>
									<li><a href="women.html">new arrivals</a></li>
									<li><a href="women.html">men</a></li>
									<li><a href="women.html">women</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">brands</a></li>
								</ul>	
							</div>							
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>kids</h4>
								<ul>
									<li><a href="women.html">Pools&Tees</a></li>
									<li><a href="women.html">shirts</a></li>
									<li><a href="women.html">shorts</a></li>
									<li><a href="women.html">twinsets</a></li>
									<li><a href="women.html">kurts</a></li>
									<li><a href="women.html">jackets</a></li>
								</ul>	
							</div>							
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>Bags</h4>
								<ul>
									<li><a href="women.html">Handbag</a></li>
									<li><a href="women.html">Slingbags</a></li>
									<li><a href="women.html">Clutches</a></li>
									<li><a href="women.html">Totes</a></li>
									<li><a href="women.html">Wallets</a></li>
									<li><a href="women.html">Laptopbags</a></li>
								</ul>	
							</div>												
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>account</h4>
								<ul>
									<li><a href="#">login</a></li>
									<li><a href="register.html">create an account</a></li>
									<li><a href="women.html">create wishlist</a></li>
									<li><a href="women.html">my shopping bag</a></li>
									<li><a href="women.html">brands</a></li>
									<li><a href="women.html">create wishlist</a></li>
								</ul>	
							</div>						
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>Accessories</h4>
								<ul>
									<li><a href="women.html">Belts</a></li>
									<li><a href="women.html">Pens</a></li>
									<li><a href="women.html">Eyeglasses</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">Watches</a></li>
									<li><a href="women.html">Jewellery</a></li>
								</ul>	
							</div>
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>Footwear</h4>
								<ul>
									<li><a href="women.html">new arrivals</a></li>
									<li><a href="women.html">men</a></li>
									<li><a href="women.html">women</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">style videos</a></li>
								</ul>	
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col2"></div>
						<div className="col1"></div>
						<div className="col1"></div>
						<div className="col1"></div>
						<div className="col1"></div>
					</div>
    				</div>
				</li>				 */}
				 <li><Link to="/listofusers" className="color5" href="#"> VIEW USERS</Link>
				{/*<div className="megapanel">
					<div className="row">
						<div className="col1">
							<div className="h_nav">
								<h4>Clothing</h4>
								<ul>
									<li><a href="women.html">new arrivals</a></li>
									<li><a href="women.html">men</a></li>
									<li><a href="women.html">women</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">brands</a></li>
								</ul>	
							</div>							
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>kids</h4>
								<ul>
									<li><a href="women.html">Pools&Tees</a></li>
									<li><a href="women.html">shirts</a></li>
									<li><a href="women.html">shorts</a></li>
									<li><a href="women.html">twinsets</a></li>
									<li><a href="women.html">kurts</a></li>
									<li><a href="women.html">jackets</a></li>
								</ul>	
							</div>							
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>Bags</h4>
								<ul>
									<li><a href="women.html">Handbag</a></li>
									<li><a href="women.html">Slingbags</a></li>
									<li><a href="women.html">Clutches</a></li>
									<li><a href="women.html">Totes</a></li>
									<li><a href="women.html">Wallets</a></li>
									<li><a href="women.html">Laptopbags</a></li>
								</ul>	
							</div>												
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>account</h4>
								<ul>
									<li><a href="#">login</a></li>
									<li><a href="register.html">create an account</a></li>
									<li><a href="women.html">create wishlist</a></li>
									<li><a href="women.html">my shopping bag</a></li>
									<li><a href="women.html">brands</a></li>
									<li><a href="women.html">create wishlist</a></li>
								</ul>	
							</div>						
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>Accessories</h4>
								<ul>
									<li><a href="women.html">Belts</a></li>
									<li><a href="women.html">Pens</a></li>
									<li><a href="women.html">Eyeglasses</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">Watches</a></li>
									<li><a href="women.html">Jewellery</a></li>
								</ul>	
							</div>
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>Footwear</h4>
								<ul>
									<li><a href="women.html">new arrivals</a></li>
									<li><a href="women.html">men</a></li>
									<li><a href="women.html">women</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">style videos</a></li>
								</ul>	
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col2"></div>
						<div className="col1"></div>
						<div className="col1"></div>
						<div className="col1"></div>
						<div className="col1"></div>
					</div>
    				</div>*/}
				</li> 
				 <li><Link to="/searchuser" className="color6" >SEARCH USER</Link></li>
				{/*<div className="megapanel">
					<div className="row">
						<div className="col1">
							<div className="h_nav">
								<h4>Clothing</h4>
								<ul>
									<li><a href="women.html">new arrivals</a></li>
									<li><a href="women.html">men</a></li>
									<li><a href="women.html">women</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">brands</a></li>
								</ul>	
							</div>							
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>kids</h4>
								<ul>
									<li><a href="women.html">Pools&Tees</a></li>
									<li><a href="women.html">shirts</a></li>
									<li><a href="women.html">shorts</a></li>
									<li><a href="women.html">twinsets</a></li>
									<li><a href="women.html">kurts</a></li>
									<li><a href="women.html">jackets</a></li>
								</ul>	
							</div>							
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>Bags</h4>
								<ul>
									<li><a href="women.html">Handbag</a></li>
									<li><a href="women.html">Slingbags</a></li>
									<li><a href="women.html">Clutches</a></li>
									<li><a href="women.html">Totes</a></li>
									<li><a href="women.html">Wallets</a></li>
									<li><a href="women.html">Laptopbags</a></li>
								</ul>	
							</div>												
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>account</h4>
								<ul>
									<li><a href="#">login</a></li>
									<li><a href="register.html">create an account</a></li>
									<li><a href="women.html">create wishlist</a></li>
									<li><a href="women.html">my shopping bag</a></li>
									<li><a href="women.html">brands</a></li>
									<li><a href="women.html">create wishlist</a></li>
								</ul>	
							</div>						
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>Accessories</h4>
								<ul>
									<li><a href="women.html">Belts</a></li>
									<li><a href="women.html">Pens</a></li>
									<li><a href="women.html">Eyeglasses</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">Watches</a></li>
									<li><a href="women.html">Jewellery</a></li>
								</ul>	
							</div>
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>Footwear</h4>
								<ul>
									<li><a href="women.html">new arrivals</a></li>
									<li><a href="women.html">men</a></li>
									<li><a href="women.html">women</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">style videos</a></li>
								</ul>	
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col2"></div>
						<div className="col1"></div>
						<div className="col1"></div>
						<div className="col1"></div>
						<div className="col1"></div>
					</div>
    				</div> */}
				{/* </li>				 */}
			
				 <li><Link to="/vieworders" className="color7" >CUSTOMER ORDERS</Link></li>
				{/*<div className="megapanel">
					<div className="row">
						<div className="col1">
							<div className="h_nav">
								<h4>Clothing</h4>
								<ul>
									<li><a href="women.html">new arrivals</a></li>
									<li><a href="women.html">men</a></li>
									<li><a href="women.html">women</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">brands</a></li>
								</ul>	
							</div>							
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>kids</h4>
								<ul>
									<li><a href="women.html">Pools&Tees</a></li>
									<li><a href="women.html">shirts</a></li>
									<li><a href="women.html">shorts</a></li>
									<li><a href="women.html">twinsets</a></li>
									<li><a href="women.html">kurts</a></li>
									<li><a href="women.html">jackets</a></li>
								</ul>	
							</div>							
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>Bags</h4>
								<ul>
									<li><a href="women.html">Handbag</a></li>
									<li><a href="women.html">Slingbags</a></li>
									<li><a href="women.html">Clutches</a></li>
									<li><a href="women.html">Totes</a></li>
									<li><a href="women.html">Wallets</a></li>
									<li><a href="women.html">Laptopbags</a></li>
								</ul>	
							</div>												
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>account</h4>
								<ul>
									<li><a href="#">login</a></li>
									<li><a href="register.html">create an account</a></li>
									<li><a href="women.html">create wishlist</a></li>
									<li><a href="women.html">my shopping bag</a></li>
									<li><a href="women.html">brands</a></li>
									<li><a href="women.html">create wishlist</a></li>
								</ul>	
							</div>						
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>Accessories</h4>
								<ul>
									<li><a href="women.html">Belts</a></li>
									<li><a href="women.html">Pens</a></li>
									<li><a href="women.html">Eyeglasses</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">Watches</a></li>
									<li><a href="women.html">Jewellery</a></li>
								</ul>	
							</div>
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>Footwear</h4>
								<ul>
									<li><a href="women.html">new arrivals</a></li>
									<li><a href="women.html">men</a></li>
									<li><a href="women.html">women</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">style videos</a></li>
								</ul>	
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col2"></div>
						<div className="col1"></div>
						<div className="col1"></div>
						<div className="col1"></div>
						<div className="col1"></div>
					</div>
    				</div>
				</li>				 */}
			
				{/* <li><a className="color8" href="#">T-SHIRT</a>
				<div className="megapanel">
					<div className="row">
						<div className="col1">
							<div className="h_nav">
								<h4>Clothing</h4>
								<ul>
									<li><a href="women.html">new arrivals</a></li>
									<li><a href="women.html">men</a></li>
									<li><a href="women.html">women</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">brands</a></li>
								</ul>	
							</div>							
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>kids</h4>
								<ul>
									<li><a href="women.html">trends</a></li>
									<li><a href="women.html">sale</a></li>
									<li><a href="women.html">style videos</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">style videos</a></li>
								</ul>	
							</div>							
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>Bags</h4>
								<ul>
									<li><a href="women.html">trends</a></li>
									<li><a href="women.html">sale</a></li>
									<li><a href="women.html">style videos</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">style videos</a></li>
								</ul>	
							</div>												
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>account</h4>
								<ul>
									<li><a href="#">login</a></li>
									<li><a href="register.html">create an account</a></li>
									<li><a href="women.html">create wishlist</a></li>
									<li><a href="women.html">my shopping bag</a></li>
									<li><a href="women.html">brands</a></li>
									<li><a href="women.html">create wishlist</a></li>
								</ul>	
							</div>						
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>Accessories</h4>
								<ul>
									<li><a href="women.html">trends</a></li>
									<li><a href="women.html">sale</a></li>
									<li><a href="women.html">style videos</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">style videos</a></li>
								</ul>	
							</div>
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>Footwear</h4>
								<ul>
									<li><a href="women.html">new arrivals</a></li>
									<li><a href="women.html">men</a></li>
									<li><a href="women.html">women</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">style videos</a></li>
								</ul>	
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col2"></div>
						<div className="col1"></div>
						<div className="col1"></div>
						<div className="col1"></div>
						<div className="col1"></div>
					</div>
    				</div>
				</li>
				<li><a className="color9" href="#">WATCHES</a>
				<div className="megapanel">
					<div className="row">
						<div className="col1">
							<div className="h_nav">
								<h4>Clothing</h4>
								<ul>
									<li><a href="women.html">new arrivals</a></li>
									<li><a href="women.html">men</a></li>
									<li><a href="women.html">women</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">brands</a></li>
								</ul>	
							</div>							
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>kids</h4>
								<ul>
									<li><a href="women.html">trends</a></li>
									<li><a href="women.html">sale</a></li>
									<li><a href="women.html">style videos</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">style videos</a></li>
								</ul>	
							</div>							
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>Bags</h4>
								<ul>
									<li><a href="women.html">trends</a></li>
									<li><a href="women.html">sale</a></li>
									<li><a href="women.html">style videos</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">style videos</a></li>
								</ul>	
							</div>												
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>account</h4>
								<ul>
									<li><a href="#">login</a></li>
									<li><a href="register.html">create an account</a></li>
									<li><a href="women.html">create wishlist</a></li>
									<li><a href="women.html">my shopping bag</a></li>
									<li><a href="women.html">brands</a></li>
									<li><a href="women.html">create wishlist</a></li>
								</ul>	
							</div>						
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>Accessories</h4>
								<ul>
									<li><a href="women.html">trends</a></li>
									<li><a href="women.html">sale</a></li>
									<li><a href="women.html">style videos</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">style videos</a></li>
								</ul>	
							</div>
						</div>
						<div className="col1">
							<div className="h_nav">
								<h4>Footwear</h4>
								<ul>
									<li><a href="women.html">new arrivals</a></li>
									<li><a href="women.html">men</a></li>
									<li><a href="women.html">women</a></li>
									<li><a href="women.html">accessories</a></li>
									<li><a href="women.html">kids</a></li>
									<li><a href="women.html">style videos</a></li>
								</ul>	
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col2"></div>
						<div className="col1"></div>
						<div className="col1"></div>
						<div className="col1"></div>
						<div className="col1"></div>
					</div>
    				</div>
				</li> */}
		 </ul> 
	</div>
</div>
</div>
        
        </>
    )
}
export default Header;