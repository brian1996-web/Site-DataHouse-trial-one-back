const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const signupRoutes = require("./controllers/signupRoutes"); // Ensure this path is correct
// const User = require("./models/signUpModel"); // Ensure this path is correct
const loginRoutes = require("./controllers/loginRoutes");
const siteDataRoutes =require("./controllers/siteDataRoutes");

// calling the configuration to run
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS




// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/NectarDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/signup",signupRoutes); // Ensure signupRoutes is correctly exported
app.use("/login",loginRoutes);
app.use("/siteData",siteDataRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
