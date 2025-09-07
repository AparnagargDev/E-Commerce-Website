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
					<div className="top_left">
						<Link to="/homepage" className="brand-logo">
							<img src="images/vastra-logo.png" alt="Vastra" className="brand-logo-img" />
						</Link>
					</div>
					<div className="top_right">
						{udata===null?
							<h2> Welcome Guest </h2>:
							<h2> Welcome&nbsp;&nbsp;{udata.fullname} </h2>
						}
					</div>
					<div className="clearfix"> </div>
				</div>
			</div>
		</div>
		<div className="header_bg">
			<div className="container">
				<div className="header">
					<div className="head-t">
						<div className="logo">
							{/* Logo moved to top section */}
						</div>
						<div className="header_right">
							<div className="rgt-bottom">
								<div className="log">
									<div className="create_btn"> 
										{udata===null?
											<>
												<Link className="btn btn-primary" to="/login" id="loginButton"><span>Login</span></Link>
											</>:
											<>
												<button className="btn btn-primary" onClick={onlogout}>Logout</button>
											</>
										}
									</div>
								</div>
								<div className="create_btn">
									{udata===null?
										<Link className="btn btn-primary" to="/Register">REGISTER</Link>:
										<Link className="btn btn-primary" to="/changepassword">CHANGE PASSWORD</Link>
									}
								</div>
								<div className="cart box_1">
									<p><a href="javascript:;" className="simpleCart_empty"></a></p>
									<div className="clearfix"> </div>
								</div>
								<div className="create_btn">
									<Link className="btn btn-primary" to="/checkout">CHECKOUT</Link>
								</div>
								<div className="clearfix"> </div>
							</div>
							<div className="search">
								<form>
									<input type="text" name="Search" placeholder="Search for Product..." onChange={(e)=>setsterm(e.target.value)} />
									<input type="submit" value="" onClick={onsearch} />
								</form>
							</div>
							<div className="clearfix"> </div>
						</div>
						<div className="clearfix"> </div>
					</div>
				</div>
			</div>
			<ul className="megamenu skyblue">
				<li className="active grid"><Link className="color1" to="/homepage">Home</Link></li>
				<li className="grid"><Link to="/categories" className="color2">Shop</Link></li>
				<li className="grid"><Link to="/products" className="color3">Collections</Link></li>
				<li className="grid"><Link to="/terms" className="color4">About</Link></li>
				<li><Link to="/contactus" className="color5">Contact</Link></li>
				{udata!==null?
					<>
						<li><Link to="/orderhistory" className="color6">Your Orders</Link></li>
					</> : null}
				{udata!==null?
					<>
						<li><Link to="showcart" className="color6"><img src="images/bag.png" alt="" />&nbsp;Your Cart</Link></li>
					</> : null}
			</ul>
		</div>
        </>
	)
}
export default Header;