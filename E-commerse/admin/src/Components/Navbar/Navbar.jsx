import React from 'react'
import './Navbar.css'
import navLogo from '../../assets/logo.png'
import navProfileIcon from '../../assets/avatar.png'
import dropdown from '../../assets/dropdown_icon.jpg'
const Navbar = () => {
    return (
        <div className='navbar'>
            <img src={navLogo} alt="" className="nav-logo" />
            <img src={navProfileIcon} className="nav-profile" alt="" />
        </div>
    )
}

export default Navbar
