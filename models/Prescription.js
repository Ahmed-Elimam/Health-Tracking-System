const mongoose = require('mongoose');
const { Schema } = mongoose;
const prescriptionSchema = new Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true},
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    checkupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Checkup', required: true },
    date: { type: Date},
    treatments: [
        {
            name: { type: String, required: true },
            concentration: { type: String, required: true},
            dose: { type: String, required: true },
            frequency: { type: String, required: true }, //how many times a day
            duration: { type: String, required: true }, //how long
            notes: { type: String }
        }
    ]
},{ timestamps: true });
const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;