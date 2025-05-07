const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();
const mongoose = require('./config/dbConnection');

const app = express();
const port = 3000
mongoose.connect;

//Middlewares
app.use(express.json());

//Routes
const authRouter = require('./routes/auth.router');

app.use('auth',authRouter); 

//Global error handler
app.use((errorHandler));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})