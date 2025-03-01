import React from "react";
import "../resources/Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../assets/assets";
const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  return (
    <div className="navbar">
      <div className="inner-navbar">
        <div className="navbar-logo"> logo</div>
        <div className="navbar-links">
          <Link to ="/" className="navbar-link">Home</Link>
          <Link className="navbar-link">About</Link>
          <Link className="navbar-link">Blogs</Link>
          <Link className="navbar-link">Contact</Link>
        </div>
        <div className="navbar-login">
          {!isLoggedIn ? (
            <div>
              <Link className="navbar-login-button" to="/login">
                Login/SignUp
              </Link>
            </div> // Show login button if not logged in
          ) : (
            <>
              <div>
                <Link  to ="/dashboard/mydetails" className="navbar-logout-button">
                  <img src={assets.account} alt="" />&nbsp;My Profile
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
