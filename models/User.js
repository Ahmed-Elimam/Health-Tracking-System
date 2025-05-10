const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    firstName: { type: String, required: true, match: /^[a-zA-Z]+$/ },
    lastName: { type: String, required: true, match: /^[a-zA-Z-]+$/ },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    nationalId: { type: String, required: true, unique: true, match: /^[0-9]{14}$/ },
    password: { type: String, required: true, select: false },
    phone: [{ type: String, required: true, match: /^01[0-2,5][0-9]{8}$/ }],
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
    },
    profileImage: { type: String },
    dateOfBirth: { type: Date },
    role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
    currentlyActive: { type: Boolean, default: true },
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    passwordResetToken: { type: String, select: false },
    passwordChangedAt: { type: Date },
    passwordResetExpires: { type: Date },
    token: { type: String, select: false },
},{ timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;