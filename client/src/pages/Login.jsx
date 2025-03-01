import React from 'react'
import '../resources/Login&Register.css'
import { assets } from "../assets/assets";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import{ message } from "antd"
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../redux/alertsSlice';
import { login } from '../redux/usersSlice';

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [data,setData] = useState({
    email:"",
    password:""
  })

  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onLogin = async(event) => {
    event.preventDefault()
    dispatch(ShowLoading());
    let newUrl = `http://localhost:4000/api/user/login`

     const response = await axios.post(newUrl,data);
     dispatch(login());
     dispatch(HideLoading());
     

   if (response.data.success){
       message.success(response.data.message)
       localStorage.setItem("token", response.data.token)
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
          <h1>Welcomeback</h1>
          <p> </p>
          </div>
          <form onSubmit={onLogin}>
            <div className="login-main-sections">
                <label htmlFor="">Email</label>
                <br />
                <input className="login-main-sections-input" type="text" placeholder="example@gmail.com" name='email' onChange={onChangehandler} value={data.email} required />
            </div>
            <div className="login-main-sections">
               <div className="forgotpassword-div">
                 <label htmlFor="">Password</label><br/>
                 <Link className="forgotpassword-div-link" to= "/forgotpassword"><span>Forgot password?</span></Link></div>
                 <br />
                <input className="login-main-sections-input" type="password" placeholder="password" name='password' onChange={onChangehandler} value={data.password} required  />
            </div>
            <div className="login-main-sections">
                <input type="checkbox" required /> i agree all terms and conditions
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

            <div className="login-main-sections">Dont&apos;t have account? <Link className="Link" to='/Register'><span> Create Account</span></Link></div>
          </form>
        </div>
      </div>
  )
}

export default Login
