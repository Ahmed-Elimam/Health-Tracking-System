const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
const mongoose = require("./config/dbConnection");
const path = require("path")
const app = express();
const port = 3000;
// mongoose.connect;


//Middlewares
app.use(express.json());


/* BY Mohamed Ragab */ 
(async function connectDB() {
  const connected = await mongoose();
  if (!connected) {
    setTimeout(connectDB, 5000);
  }
})();
app.use('/assets', express.static(path.join(__dirname, 'assets')));
const paymentRoutes = require('./routes/payment.router');

app.use('/', paymentRoutes);
/* end of my edit */


//Routes
const authRouter = require("./routes/auth.router");
const patientRouter = require("./routes/patient.router");

app.use("/auth", authRouter);
app.use("/patients", patientRouter);

//Global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

