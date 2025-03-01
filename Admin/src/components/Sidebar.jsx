import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import '../resources/Sidebar.css'


const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/' className="sidebar-option">
          <img src={assets.home} alt="" />
          <p>Home</p>
        </NavLink>
        <NavLink to='/addbus' className="sidebar-option">
          <img src={assets.Add} alt="" />
          <p>Add Bus</p>
        </NavLink>
        <NavLink to='/allbus'  className="sidebar-option">
          <img src={assets.checklist} alt="" />
          <p>Busses List</p>
        </NavLink>
        <NavLink to='/booking' className="sidebar-option">
          <img src={assets.orderstatus} alt="" />
          <p>Bookings</p>
        </NavLink>
      </div>
      
    </div>
  )
}

export default Sidebar