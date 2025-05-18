const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();
const path = require('path');
const dbConnect = require('./config/dbConnection');
const cors = require('cors');

const app = express();
const port = 9090;
// mongoose.connect;
dbConnect();

// allow access from Frontend
app.use(
    cors({
        origin: 'http://localhost:4200',
        credentials: true, // if you're sending cookies
    })
);

//Middlewares
app.use(express.json());

/* BY Mohamed Ragab */
app.use('/assets', express.static(path.join(__dirname, 'assets')));
const paymentRoutes = require('./routes/payment.router');
app.use('/', paymentRoutes);
/* end of my edit */

//Routes
const authRouter = require('./routes/auth.router');
const patientRouter = require('./routes/patient.router');
const doctorRouter = require('./routes/doctor.router');
const adminRouter = require('./routes/admin.router');
const SpecializationRouter = require('./routes/Specialization.router');
const TreatingRouter = require('./routes/treating.router');
const prescriptionRouter = require('./routes/prescription.router');
const checkupRouter = require('./routes/checkup.router');
const threadRouter = require('./routes/thread.router');

app.use('/api/auth', authRouter);
app.use('/api/patients', patientRouter);
app.use('/api/admins', adminRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/specializations', SpecializationRouter);
app.use('/api/treatings', TreatingRouter);
app.use('/api/prescriptions', prescriptionRouter);
app.use('/api/checkups', checkupRouter);
app.use('/api/threads', threadRouter);


//Global error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
