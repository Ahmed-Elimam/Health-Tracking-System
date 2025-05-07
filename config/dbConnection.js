const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/HealthTrackingDB').then(() => {
    console.log('MongoDB connected successfully');
  }).catch((err) => {
    console.log('MongoDB connection error:');
  process.exit(1);
  });

module.exports = mongoose;