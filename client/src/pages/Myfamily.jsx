import React, { useState, useEffect } from "react";
import "../resources/myfamily.css";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { assets } from "../assets/assets";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import axios from "axios";
const Myfamily = () => {
  useEffect(() => {
    fetchMembers();
  }, []);

  const dispatch = useDispatch();
  const [deletpopup, setDeletPopup] = useState(false)
  const { user } = useSelector((state) => state.users);
  const [editPopup, setEditPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [adhar, setAdhar] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [memberId, setMemberId] = useState("");
  const [members, setMembers] = useState([""]);
  

  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/user/${user.email}/getmember`
      );
      setMembers(response.data.user.FamilyData);
    } catch (error) {}
  };

  const removeMember = async () => {
    dispatch(ShowLoading());
    await axios.delete(

      `http://localhost:4000/api/user/${user.email}/delete/${memberId}`
    );
    fetchMembers();
    dispatch(HideLoading());

    message.success("Member Deleted Successfully");
  };

  const updateMember = async () => {
    const data = { name: name, age: age, phone: phone, adhar: adhar, gender: gender}
    dispatch(ShowLoading());
    const response = await axios.put(
      `http://localhost:4000/api/user/${user.email}/updatemember/${memberId}`, data
    );
    dispatch(HideLoading());
    if(response.data.success){
      message.success("Member Updated Successfully");
    }else{
      message.error("Failed to Update Member");
    }
    console.log(response);

  }

  const handleAddMember = async (e) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `http://localhost:4000/api/user/${user._id}/addmember`,
        {
          name: name,
          age: age,
          adhar: adhar,
          gender: gender,
          phone: phone,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDetails = async (member) => {
    setEditPopup(true);
    setName(member.name);
    setAge(member.age);
    setAdhar(member.adhar);
    setGender(member.gender);
    setPhone(member.phone);
    setMemberId(member._id);
  };
  const handleDelete = (member) => {
    setDeletPopup(true);
    setMemberId(member._id);
  };

  return (
    <div className="myfamily">
      <div className="myfamily-heading">Members Details</div>
      <div className="myfamily-main">
        {Array.isArray(user.FamilyData) && user.FamilyData.length > 0 ? (
          members.map((member, index) => (
            <div key={index} className="member-box">
              <div className="member-box-main">
                <div className="member-inner-box">
                  <label htmlFor="">Name:</label>
                  <br />
                  <p>{member.name}</p>
                </div>
                <div className="member-inner-box">
                  <label htmlFor="">Age:</label>
                  <br />
                  <p>{member.age}</p>
                </div>
              </div>

              <div className="member-box-main">
                <div className="member-inner-box">
                  <label htmlFor="">Phone Number:</label>
                  <br />
                  <p>{member.phone}</p>
                </div>
                <div className="member-inner-box">
                  <label htmlFor="">Adhar Number:</label>
                  <br />
                  <p>{member.adhar}</p>
                </div>
              </div>

              <div className="member-box-main">
                <div className="member-inner-box">
                  <label htmlFor="">Gender:</label>
                  <br />
                  <p>{member.gender}</p>
                </div>
              </div>

              <div className="member-box-main-buttons">
                <div className="member-update-button" onClick={() => fetchDetails(member)}>
                  Update
                </div>
                <div className="member-delete-button" onClick={()=> handleDelete(member)}>
                  Delete
                </div>
              </div>


            </div>
          ))
        ) : (
          <p>Please Add Member</p>
        )}
        <div className="addmember" onClick={() => setShowForm(true)}>
          <img src={assets.plus} alt="" />
        </div>
        {showForm ? (
          <div className="addmemberform">
            <div className="myfamily-heading">Add Member</div>

            <div className="member-input-sections">
              <div className="member-input-sections-inputs">
                <label htmlFor="">Name :</label>
                <br />
                <input
                  type="text"
                  placeholder="Member Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="member-input-sections-inputs">
                <label htmlFor="">Age :</label>
                <br />
                <input
                  type="text"
                  placeholder="Member Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>

            <div className="member-input-sections">
              <div className="member-input-sections-inputs">
                <label htmlFor="">Phone Number :</label>
                <br />
                <input
                  type="text"
                  placeholder="phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input"
                />
              </div>
              <div className="member-input-sections-inputs">
                <label htmlFor="">Adhar Number :</label>
                <br />
                <input
                  type="text"
                  placeholder="Adhar Number"
                  value={adhar}
                  onChange={(e) => setAdhar(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="member-input-sections">
              <div className="member-input-sections-inputs">
                <label htmlFor="">Gender :</label>
                <br />
                <select onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="addmember-button">
              <div
                className="addmember-button-save"
                onClick={() => handleAddMember()}
              >
                Save
              </div>
              <div
                className="addmember-button-cancle"
                onClick={() => setShowForm(false)}
              >
                Cancle
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {editPopup ? (
        <div className="eddit-popup">
          <div className="eddit-popup-heading">
            <h1>Edit Members</h1>
          </div>
          <div className="eddit-popup-main">
            <div className="mydetails-box">
              <div className="mydetails-inner-box">
                <label htmlFor="">First Name:</label>
                <br />
                <input
                  type="text"
                  placeholder={name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="edit-main-input"
                />
              </div>
              <div className="mydetails-inner-box">
                <label htmlFor="">Age</label>
                <br />
                <input
                  type="text"
                  placeholder={age}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="edit-main-input"
                />
              </div>
            </div>

            <div className="mydetails-box">
              <div className="mydetails-inner-box">
                <label htmlFor="">Phone:</label>
                <br />
                <input
                  type="text"
                  placeholder={phone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="edit-main-input"
                />
              </div>
              <div className="mydetails-inner-box">
                <label htmlFor="">Adhar Number</label>
                <br />
                <input
                  type="text"
                  placeholder={adhar}
                  value={adhar}
                  onChange={(e) => setAdhar(e.target.value)}
                  className="edit-main-input"
                />
              </div>
            </div>

            <div className="mydetails-box">
              <div className="mydetails-inner-box">
                <label htmlFor="">Gender:</label>
                <br />
                <select onChange={(e) => setGender(e.target.value)} className="edit-main-input-gender">
                  <option value={gender}>{gender}</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="mydetails-box">
              <button className="mydetails-edit-button" onClick={() => updateMember()}>Update</button>
              <button
                className="mydetails-delet-button"
                onClick={() => setEditPopup(false)}
              >
                Cancle
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div>
        {deletpopup? <div className='remove-account'>
                  <div className='remove-account-main'>
                
                <div className='remove-account-main-inner'>
                   <img src={assets.warning} alt="" className='remove-account-warning'/>
                   <p>You Want to sure to Delet Member Parmanently</p>
                   <div className='remove-box'>
                  <button className='remove-button'  on onClick={() => removeMember()}>Delete</button>
                  <button className='remove-cancle-button' onClick= {() => setDeletPopup(false)}>Cancle</button>
                </div>
                </div>
                </div>
                </div>:<></>}
      </div>
      
    </div>
  );
};

export default Myfamily;
