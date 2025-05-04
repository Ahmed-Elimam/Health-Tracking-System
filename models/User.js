const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    firstName: { type: String, required: true, match: /^[a-zA-Z]+$/ },
    lastName: { type: String, required: true, match: /^[a-zA-Z]+$/ },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    nationalId: { type: String, required: true, unique: true, match: /^[0-9]{14}$/ },
    password: { type: String, required: true, select: false, match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ },
    phone: { type: String, required: true, match: /^01[0-2,5][0-9]{8}$/ },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
    },
    profilePicture: { type: String },
    dateOfBirth: { type: Date },
    role: { type: String, required: true, enum: ['patient', 'doctor', 'admin'] },
    token: { type: String, select: false },
},{ timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;