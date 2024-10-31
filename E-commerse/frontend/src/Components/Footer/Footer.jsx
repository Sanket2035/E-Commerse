import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo.png'
import instagram from '../Assets/instagram_icon.png'
import whatsapp from '../Assets/whatsapp_icon.png'
import facebook from '../Assets/facebook_icon.png'
const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={footer_logo} alt="logo" />
                <p>SHOPEZY</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icons">
                <div className="footer-icons-container">
                    <img src={instagram} alt="instagram" />
                </div>

                <div className="footer-icons-container">
                    <img src={whatsapp} alt="whatsapp" />
                </div>

                <div className="footer-icons-container">
                    <img src={facebook} alt="facebook" />
                </div>
            </div>
            <hr />
            <div className="footer-copyright">
                <p>Shopezy© 2024. All rights reserved</p>
            </div>
        </div>
    )
}

export default Footer
