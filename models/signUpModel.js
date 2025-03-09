const mongoose = require("mongoose");

const SignupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    enum: ["engineer", "admin", "surveyor"], // Ensures only valid positions
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  email:{
    type:String,
    required:true,
    unique: true,
  },
  password:{
    type: String,
    required:true,
  }
});

const User = new mongoose.model("User",SignupSchema);
module.exports = User;




