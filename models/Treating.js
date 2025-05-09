const mongose = require('mongoose');
const {Schema} = mongose;
const treatingSchema = new Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    treatmentStartDate: { type: Date, required: true },
    treatmentEndDate: { type: Date, required: true },
    isActive: { type: Boolean, default: false },
},{ timestamps: true });
const Treating = mongose.model('Treating', treatingSchema);
module.exports = Treating;