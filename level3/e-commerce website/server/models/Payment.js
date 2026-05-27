const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  paymentId: String,
  amount: Number,
  status: String,
  currency: String,
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
