import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from "../assets/assets";
import { useState } from 'react';
import '../resources/Login&Register.css'
import axios from "axios"
import{ message } from "antd"
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { login } from '../redux/usersSlice';


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data,setData] = useState({
    firstname:"",
    lastname:"",
    phone:"",
    email:"",
    password:"",
    conformpassword:""
    })

 
  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onRegister = async(event) => {
    event.preventDefault()
    dispatch(ShowLoading);
    let newUrl = "http://localhost:4000/api/user/register"

   const response = await axios.post(newUrl,data);
   dispatch(HideLoading());

   if (response.data.success){
       message.success(response.data.message)
       localStorage.setItem("token", response.data.token);
       dispatch(login());
       navigate("/");
       
   }
   else{
       message.error(response.data.message)
   } 
  }



  return (
    <div className="login">
        <div className="login-main">
          <div className="login-main-header">
            <img src={assets.busjourney} alt="" />
            <h1>Welcome you</h1>
            <p>Please enter your details for create a new Account.</p>
          </div>
          <form onSubmit={onRegister}>
            
              <div className="signup-main-sections-1">
                <div className="box">
                  <label htmlFor="">First Name</label><br />
                  <input className="login-main-sections-input" type="text" placeholder="first name" name='firstname' onChange={onChangehandler} value={data.firstname} required />
                </div>
                <div className="box">
                  <label htmlFor="">Last Name</label><br />
                  <input className="login-main-sections-input" type="text" placeholder="last name" name='lastname' onChange={onChangehandler} value={data.lastname} required  />
                </div>
              </div>

              <div className="signup-main-sections-1">
                <div className="box">
                  <label htmlFor="">Email</label><br />
                  <input className="login-main-sections-input" placeholder="example@gmail.com" type="text" name='email' onChange={onChangehandler} value={data.email} required />
                </div>
                <div className="box">
                  <label htmlFor="">Phone No.</label><br />
                  <input className="login-main-sections-input" placeholder="phone number" type="text" name='phone' onChange={onChangehandler} value={data.phone} required />
                </div>
              </div>

            <div className="signup-main-sections">
              <label htmlFor="">Password</label><br />
              <input className="login-main-sections-input" placeholder="password" type="text" name='password' onChange={onChangehandler} value={data.password} required />
            </div>
            <div className="signup-main-sections">
            <label htmlFor="">Conform Password</label><br />
            <input className="login-main-sections-input" placeholder="conform password" type="text" name='conformpassword' onChange={onChangehandler} value={data.conformpassword} required />
            </div>

            <div className="signup-main-sections">
               <input type="checkbox" required  /> i agree all terms and conditions..
            </div>
            <div className="login-main-button">
             <button className="login-main-login-button" type='submit'><b>Login</b></button>
             <Link to='/' className="login-main-cancle-button"> <button className="login-main-cancle-button" type='submit'><b>Cancle</b></button></Link>
            </div>
            <div className="login-main-sections-line">
                <h3><span>OR</span></h3>
            </div>

            <div className="signup-main-sections-1">
                <div className="box">
                  <div className="login-main-sections-social"><img  src={assets.applelogo} alt="" /></div>
                </div>
                <div className="box">
                <div className="login-main-sections-social"><img  src={assets.googlelogo} alt="" /></div>
                </div>
            </div>

            <div className="login-main-sections">Already have an account? <Link className="Link" to='/login'><span> Login</span></Link></div>
          </form>
        </div>
      </div>
  )
}

export default Register
