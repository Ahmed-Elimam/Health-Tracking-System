const mongoose = require('mongoose');
const { Schema } = mongoose;
const threadSchema = new Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    name: { type: String }
}, { timestamps: true });
const Thread = mongoose.model('Thread', threadSchema);
module.exports = Thread;