const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();
var morgan = require('morgan');
const app = express()
const port = 3000

const authRouter = require('./routes/auth.router');

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/HealthTrackingDB').then(() => {
     console.log('MongoDB connected successfully');
   }).catch((err) => {
     console.log('MongoDB connection error:');
   process.exit(1);
   });

app.use('auth',authRouter); 

//Global error handler
app.use((errorHandler));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})