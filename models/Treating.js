const mongoose = require('mongoose');
const {Schema} = mongoose;
const treatingSchema = new Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    treatmentStartDate: { type: Date, required: true },
    treatmentEndDate: { type: Date, required: true },
    isActive: { type: Boolean, default: false },
},{ timestamps: true });
const Treating = mongoose.model('Treating', treatingSchema);
module.exports = Treating;