const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  sessionId: String,
  clientEmail: String,
  amountTotal: Number,
  currency: String,
  paymentStatus: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', paymentSchema);
