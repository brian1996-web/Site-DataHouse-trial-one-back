
const express = require("express");
const router = express.Router();
const User = require("../models/signUpModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const signup = require("./signUpRoutes")

// Login user

// User Login Route
router.post("/login", async (req, res) => {

  try {
 const{email,password} = req.body;
 console.log("received login details", req.body);

 //check if user exits
 const user = await User.findOne({email});
 if(!user) return res.status(400).json({message:"Invalid email"});

//comparing password
const isMatch = await bcrypt.compare(password,user.password);
if(!isMatch) return res.status(400).json({message:"invalid password"});

//Generate Token
// const user_id = user._id; 
// const token = jwt.sign({id: user_id},process.env.JWT_SECRET,{expiresIn:"1hr"},);
// res.json({ message: "Logged in successfully", token });


res.status(200).json({
  message: "Login successful",
  siteTitle: signup.siteTitle, // 🔹 Send siteTitle to frontend
});




  }

  

  catch(error){
    res.status(500).json({message:"Server error"})
      console.error(error);
  }
});




module.exports = router;
