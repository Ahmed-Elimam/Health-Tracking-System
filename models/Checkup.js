const mongoose = require('mongoose');
const { Schema } = mongoose;
const checkupSchema = new Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true },
    threadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    type: { type: String, enum: ['checkup', 'follow-up'], default: 'checkup' },
    specialization: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialization', required: true },
    checkupDate: { type: Date, required: true },
    symptoms: [{ type: String}],
    doctorSigns: [{ type: String}],
    diagnosis: { type: String },
    doctorRecommendations: { type: String },
    followup: {
        needed: { type: Boolean, default: false }, 
        checkupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Checkup' },
        date: { type: Date, validate: {
            validator: function(value) {
              return !value || value > this.checkupDate;
            },message: 'Followup date must be after the checkup date.'}},
        attended: { type: Boolean, default: false },
    }
}, { timestamps: true });

const Checkup = mongoose.model('Checkup', checkupSchema);
module.exports = Checkup;