const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,});

    console.log("MongoDB connected:" + conn.connection.port);
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;
