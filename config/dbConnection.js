const mongoose = require("mongoose");

// MongoDB connection
async function dbConnect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/HealthTrackingDB");
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Connection error:", err);
    process.exit(1);
  }
}
module.exports = dbConnect;
