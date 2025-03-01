import React from 'react'
import '../resources/Navbar.css'
import { assets } from '../assets/assets'


const Navbar = () => {
  return (
    <div className='navbar'>
        <h1>BookMyBus</h1>
        <img className='logo' src="" alt="" />
        <img className='profile' src={assets.profile} alt="" />
      
    </div>
  )
}

export default Navbar