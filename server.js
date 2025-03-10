const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const signupRoutes = require("./controllers/signUpRoutes"); // Ensure this path is correct
// const User = require("./models/signUpModel"); // Ensure this path is correct
const loginRoutes = require("./controllers/loginRoutes");
const siteDataRoutes = require("./controllers/siteDataRoutes");

// calling the configuration to run
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/NectarDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log(" MongoDB connected successfully"))
//   .catch((err) => console.error("MongoDB connection error:", err));



const dotenv = require("dotenv");
dotenv.config();


// Connecting to the database
require("dotenv").config();
console.log("MONGO_URL:", process.env.MONGO_URI); // Debugging line

mongoose
  .connect("mongodb+srv://Brian:Brian@cluster0.0kxi8.mongodb.net/database-1?retryWrites=true&w=majority&appName=Cluster0", {
   
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

require("dotenv").config();
const port = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;



// Routes
app.use("/signup", signupRoutes); // Ensure signupRoutes is correctly exported
app.use("/login", loginRoutes);
app.use("/siteData", siteDataRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Start Server

app.listen(port, () => console.log(`Server running on port ${port}`));
