const express = require("express");
const User = require("../models/signUpModel");
const bcrypt = require("bcryptjs");

const router = express.Router();

// ✅ User Signup Route using Passport.js
router.post("/signup", async (req, res) => {
  const { name, position, phone, location,email, password } = req.body;

  console.log("📥 Received Data:", req.body); // Debugging log

  try {
    //check if user exits in the database by using email
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exits." });

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //save user to the db
    user = new User({
      name,
      position,
      phone,
      location,
      email,
      password: hashedPassword,
    });
    await user.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error); //logs actual error message.
  }
});

module.exports = router;
