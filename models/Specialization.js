const mongoose = require('mongoose');
const { Schema } = mongoose;

const specializationSchema = new Schema({
    name: { type: String, required: true, unique: true },
});

const Specialization = mongoose.model('Specialization', specializationSchema);
module.exports = Specialization;
