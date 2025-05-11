const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
const dbConnect = require("./config/dbConnection");
// require("./seeds/seedUsers");
const app = express();
const port = 9090;
// mongoose.connect;
dbConnect();
//Middlewares
app.use(express.json());

//Routes
const authRouter = require("./routes/auth.router");
const patientRouter = require("./routes/patient.router");
const doctorRouter = require("./routes/doctor.router");
const adminRouter = require("./routes/admin.router");
const SpecializationRouter = require("./routes/Specialization.router");
const TreatingRouter = require("./routes/treating.router");
app.get("/", (req, res) => {
  res.send("OK");
});
app.use("/auth", authRouter);
app.use("/patients", patientRouter);
app.use("/doctors", doctorRouter);
app.use("/admins", adminRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/specializations", SpecializationRouter);
app.use("/api/treatings", TreatingRouter);

//Global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
