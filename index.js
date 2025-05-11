const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
const dbConnect = require("./config/dbConnection");
// require("./seeds/seedUsers");
const app = express();
const port = 7070;
// mongoose.connect;
dbConnect();
//Middlewares
app.use(express.json());

//Routes
const authRouter = require("./routes/auth.router");
const patientRouter = require("./routes/patient.router");
const doctorRouter = require("./routes/doctor.router");
const adminRouter = require("./routes/admin.router");

app.use("/auth", authRouter);
app.use("/patients", patientRouter);
app.use("/doctors", doctorRouter);
app.use("/admins", adminRouter);

//Global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
