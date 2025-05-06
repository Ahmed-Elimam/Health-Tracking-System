const mongoose = require('mongoose');
const { Schema } = mongoose;
const doctorSchema = new Schema({
    userId: { type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    specialization: { type: String, required: true },
    certificates: [{ 
        name: { type: String, required:true},
        copy: { type: String, required:true},
     }],
    clinicAddress: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
    },
    bio: { type: String, required: true },
    experience: { type: Number, required: true, min: 0 },
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;