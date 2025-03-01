import User from '../models/usersModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator';
import 'dotenv/config'
import Bookings from '../models/bookingModel.js';



const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
  // register user

  const registerUser = async (req, res) => {
    const { firstname, lastname, password, conformpassword, email, phone, gender, adharcard } =
      req.body;
    try {
      const exists = await User.findOne({ email: email });
      if (exists) {
        return res.json({ success: false, message: "user already exists" });
      }
  
      // validating email formet and strong password
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter valid email" });
      }
      if (password.length < 8) {
        return res.json({
          success: false,
          message: "Please enter a strong password",
        });
      }
      if (phone.length < 10 || phone.length > 10) {
        return res.json({
          success: false,
          message: "Please enter a valid Phone Number",
        });
      }
      if (password != conformpassword) {
        return res.json({ success: false, message: "Passwords do not match" });
      }
  
      // hashing user password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        gender: gender,
        adharcard: adharcard,
        password: hashedPassword,
      });
  
      const user = await newUser.save();
      const token = createToken(user._id);
      res.json({ success: true, message: "user created successfully", token });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };


  // Login User
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // console.log(name)
  
    try {
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.json({ success: false, message: "User Doesn't exist" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.json({ success: false, message: "Invalid credentials" });
      }
  
      const token = createToken(user._id);
      const userId = user._id;
      res.json({ success: true, message: "Login Successfully", token: token, userId: userId});
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

  // getuser 
  
  const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.body.userId);
      res.send({ success: true, message: "User found", data: user });
    } catch (error) {
      res.json({success: false, message: error.message, data: null})
    }
  }

  const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'User Updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating bus', error });
    }
}

const removeUser = async (req, res) => {
  try {
      const deleteUser = await User.findByIdAndDelete(req.params.id);
      if (!deleteUser) {
          return res.status(404).json({ message: 'User Not Found' });
      }
      res.json({ message: 'user deleted successfully', deleteUser });
  } catch (error) {
      res.status(500).json({ message:  error.message });
  }
         
}

/* MEMBER FUNCTIONALTY */

/* ADD MEMBER */

// Add member to user
const addMember = async (req, res) => {
  const { name, age, adhar, phone, gender } = req.body; // Adjust based on your member structure

  try {
      const user = await User.findById(req.params.id);

      if (!user) {
          return res.json({ message: 'User  not found' });
      }

      // Check if a member with the same adhar already exists
      const exists = user.FamilyData.some(FamilyData => FamilyData.adhar == adhar);
      if (exists) {
          return res.json({ success: false, message: "Member already registered" });
      }

      // Validate phone number length
      if (phone.length !== 10) {
          return res.json({
              success: false,
              message: "Please enter a valid phone number",
          });
      }

      // Validate adhar number length
      if (adhar.length !== 12) {
          return res.json({
              success: false,
              message: "Please enter a valid Adhar number",
          });
      }

      // Assuming members is an array in your User schema
      user.FamilyData.push({ name, age, gender, phone, adhar });
      await user.save();

      res.status(200).json({ success: true, message: "Member Added Successfully" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

  const removeMember = async (req, res) => {
    try {
      const user = await User.findOne({email:req.params.email})
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        const removeMember = await user.FamilyData.id(req.params.id);
        if (!removeMember) {
            return res.status(404).json({ message: 'Member not found' });
        }
        user.FamilyData.pull(removeMember._id);

        await user.save();

        res.json({ success: true, message: 'Member deleted successfully', removeMember , user });
        
    } catch (error) {
        res.status(500).json({ message:  error.message });
    }
           
  }

  const updateMember = async (req, res) => {
    const { name, age, phone, gender, adhar } = req.body;
    try {
      const user = await User.findOne({email:req.params.email});
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: "use not found" });
      }
      const updateMember = await user.FamilyData.id(req.params.id);
      if (!updateMember) {
        return res.status(404).json({ message: 'Member Not Found' });
      }
      updateMember.name = name;
      updateMember.age = age;
      updateMember.gender = gender;
      updateMember.phone = phone;
      updateMember.adhar = adhar;
      await user.save();
      
      res.json({ success: true, message: 'Member update successfully successfully', user });

    } catch (error) {
      res.status(500).json({ message:  error.message });
    }
  }


  const fetchMembers = async (req, res) => {
      try {
        const user = await User.findOne({email:req.params.email});
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: 'Members fetched successfully', user });     
      } catch (error) {
        
      }
  }

  const fetchTicket = async (req, res) => {

    try {
      const Booking = await Bookings.find({ user: req.body.id})
      .populate("bus")
      .populate("ticket");
        res.json({ success: true, message: 'Ticket fetched successfully', Booking});
    } catch (error) {
      res.json({ success: false, message: message.errorr});
    }

  }


  export {registerUser, loginUser, getUser, updateUser, removeUser, addMember, removeMember, updateMember, fetchMembers, fetchTicket}