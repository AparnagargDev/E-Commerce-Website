import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaGoogle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram } from "react-icons/fa"; 
import './Home.css';

function Footer() {
    return (
        <>
            <div className="footer">
                <div className="footer-container">
                    
                    {/* About Us Section */}
                    <div className="footer-column">
                        <h4>About Us</h4>
                        <p>We believe that clothing is more than just fabric. Our mission is to blend style, quality, and comfort to create apparel that reflects your individuality and enhances your lifestyle.</p>
                    </div>

                    {/* My Account Section */}
                    <div className="footer-column">
                        <h4>My Account</h4>
                        <ul>
                            <li><Link to="/Register">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/showcart">My Cart</Link></li>
                            <li><Link to="/orderhistory">Order History</Link></li>
                        </ul>
                    </div>

                    {/* Our Stores Section */}
                    <div className="footer-column">
                        <h4>Our Stores</h4>
                        <ul>
                            <li><FaMapMarkerAlt /> Bangalore Palace, Palace Road, Bangalore - 560052</li>
                            <li><FaPhone /> 025-2839341</li>
                            <li><FaEnvelope /> <a href="mailto:support@vastra.com">support@vastra.com</a></li>
                        </ul>
                    </div>

                    {/* Social Media Section */}
                    <div className="footer-column">
                        <h4>Follow Us</h4>
                        <div className="social-icons">
                            <a href="#"><FaFacebookF /></a>
                            <a href="#"><FaTwitter /></a>
                            <a href="#"><FaGoogle /></a>
							<a href="#"><FaInstagram /></a>
                        </div>
                    </div>
                    
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p>© 2015–{new Date().getFullYear()} Vastra. All rights reserved.</p>
                </div>
            </div>
        </>
    );
}

export default Footer;
