const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Signup = require("./models/signUpModel"); // Adjust path based on your project structure

// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/NectarDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

// Function to test password comparison
async function testPasswordComparison(enteredPassword, phoneNumber) {
  try {
    await connectDB();

    // Fetch user by phone number
    const user = await Signup.findOne({ phone: phoneNumber });

    if (!user) {
      console.log("❌ No user found with this phone number");
      return;
    }

    console.log("🔹 Stored Hashed Password in DB:", user.password);

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(enteredPassword, user.password);
    console.log("✅ Does password match?:", isMatch);
  } catch (error) {
    console.error("❌ Error during password comparison:", error);
  } finally {
    mongoose.connection.close(); // Close DB connection after operation
  }
}

// Call function with sample input
const enteredPassword = "123456"; // Change this to match what the user enters at login
const phoneNumber = "0753816943"; // Enter the phone number of a user in your DB
testPasswordComparison(enteredPassword, phoneNumber);
