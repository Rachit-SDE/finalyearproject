import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../resources/mydetails.css'
import axios from 'axios'
import { message } from 'antd'
import { HideLoading, ShowLoading } from '../redux/alertsSlice'
import { assets } from '../assets/assets'
import { useNavigate} from 'react-router-dom'
import { logout } from '../redux/usersSlice'

const Mydetails = () => {

  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  useEffect(() => {
          fetchuser();
      }, []);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deletpopup, setDeletPopup] = useState(false)
  const [editPopup, setEditPopup] = useState(false)
  const [userId, setUserId] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [adharcard, setAdharCard] = useState('');

  const updateuser = async () => {
    const updateduser = { firstname, lastname, email, phone, gender, adharcard,};

    dispatch(ShowLoading());
    await axios.put(`http://localhost:4000/api/user/update/${userId}`, updateduser);
    fetchuser();
    dispatch(HideLoading());  
    message.success("user Updated Successfully") 
  };

  const deletuser = async () => {
    dispatch(ShowLoading());
    await axios.delete(`http://localhost:4000/api/user/delete/${userId}`);
    localStorage.removeItem('token');
    navigate('/')
    dispatch(logout())
    dispatch(HideLoading());
    message.success("user Deleted Successfully")
    
      
  };

  const fetchuser = async () => {
    setEditPopup(false);
    setUserId(user?._id);
    setFirstName(user?.firstname);
    setLastName(user?.lastname);
    setEmail(user?.email);
    setPhone(user?.phone);
    setGender(user?.gender);
    setAdharCard(user?.adharcard);
  }

  const {user} = useSelector(state => state.users)

  return (
    <div className='mydetails'>
      <div className='mydetails-inner-heading'>
          <h1>MY DETAILS</h1>
      </div>
      <div className='mydetails-inner'>
       <div className='mydetails-box'>
         <div className='mydetails-inner-box'>
          <label htmlFor="">First Name:</label><br/>
          <p>{user?.firstname}</p>
         </div>
         <div className='mydetails-inner-box'>
           <label htmlFor="">Last Name</label><br/>
           <p>{user?.lastname}</p>
         </div>
       </div>
       
        <div className='mydetails-box'>
          <div className='mydetails-inner-box'>
            <label htmlFor="">Email:</label><br/>
            <p>{user?.email}</p>
          </div>
          <div className='mydetails-inner-box'>
            <label htmlFor="">Mobile Number:</label><br/>
            <p>{user?.phone}</p>
          </div>
        </div>

        <div className='mydetails-box'>
          <div className='mydetails-inner-box'>
            <label htmlFor="">Gender:</label><br/>
            <p>{user?.gender}</p>
          </div>
          <div className='mydetails-inner-box'>
            <label htmlFor="">Adhar Number:</label><br/>
            <p>{user?.adharcard}</p>
          </div>
        </div>

        <div className='mydetails-box'>
          <button className='mydetails-edit-button'onClick={() => {
                                fetchuser()
                                setEditPopup(true)
                                 // Ensure stoppages is an array
                                
                            }}  
           >Edit Account</button>
          <button className='mydetails-delet-button' onClick = {() => setDeletPopup(true)}>Detel Account</button>
        </div>
      </div>


      <div>

        {editPopup ? <div className='eddit-popup'>
          <div className='eddit-popup-heading'>
            <h1>Edit My Account</h1>
          </div>
        <div className='eddit-popup-main'>
        <div className='mydetails-box'>
         <div className='mydetails-inner-box'>
          <label htmlFor="">First Name:</label><br/>
          <input type="text" placeholder={firstname} value={firstname} onChange={(e) => setFirstName(e.target.value)} className='edit-main-input'/>
         </div>
         <div className='mydetails-inner-box'>
           <label htmlFor="">Last Name</label><br/>
           <input type="text" placeholder={lastname} value={lastname} onChange={(e) => setLastName(e.target.value)} className='edit-main-input'/>
         </div>
       </div>
       
        <div className='mydetails-box'>
          <div className='mydetails-inner-box'>
            <label htmlFor="">Email:</label><br/>
            <input type="text" placeholder={email} value={email}  onChange={(e) => setEmail(e.target.value)} className='edit-main-input'/>
          </div>
          <div className='mydetails-inner-box'>
            <label htmlFor="">Mobile Number:</label><br/>
            <input type="text" placeholder={phone} value={phone} onChange={(e) => setPhone(e.target.value)} className='edit-main-input'/>
          </div>
        </div>

        <div className='mydetails-box'>
          <div className='mydetails-inner-box'>
            <label htmlFor="">Gender:</label><br/>
            <select onChange={(e) => setGender(e.target.value)} className='edit-main-input'>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
            </select>
          </div>
          <div className='mydetails-inner-box'>
            <label htmlFor="">Adhar Number:</label><br/>
            <input type="text" placeholder={adharcard} value={adharcard}  onChange={(e) => setAdharCard(e.target.value)} className='edit-main-input'/>
          </div>
          </div>
          <div className='mydetails-box'>
          <button className='mydetails-edit-button'  on onClick={() => updateuser()}>Save Account</button>
          <button className='mydetails-delet-button' onClick= {() => setEditPopup(false)}>Cancle</button>
        </div>
        </div>
          
          </div> : <></>}
      </div>

      
        {deletpopup? <div className='remove-account'>
          <div className='remove-account-main'>
        
        <div className='remove-account-main-inner'>
           <img src={assets.warning} alt="" className='remove-account-warning'/>
           <p>You Want to sure to Delet Account Parmanently</p>
           <div className='remove-box'>
          <button className='remove-button'  on onClick={() => deletuser()}>Delet</button>
          <button className='remove-cancle-button' onClick= {() => setDeletPopup(false)}>Cancle</button>
        </div>
        </div>
        </div>
        </div>:<></>}
        
        
    </div>
  )
}

export default Mydetails
