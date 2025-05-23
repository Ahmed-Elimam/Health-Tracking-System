const mongoose = require('mongoose');
const { Schema } = mongoose;
const patientSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bloodType: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    height: { type: Number, min: 0 },
    weight: { type: Number, min: 0 },
    otp: { type: String, match: /^[0-9]{6}$/ },
    plan: { type: String, required: true, enum: ['Basic', 'Premium'] },
    accessRequests:[{ type: mongoose.Schema.Types.ObjectId, ref: 'doctor' }],
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
