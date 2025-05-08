const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
const mongoose = require("./config/dbConnection");

const app = express();
const port = 7070;
// mongoose.connect;

//Middlewares
app.use(express.json());

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
