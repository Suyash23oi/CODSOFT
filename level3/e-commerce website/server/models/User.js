const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  address: { type: String },
  city: { type: String },
  postalCode: { type: String },
  country: { type: String },
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      image: String,
      price: Number,
      qty: Number,
    },
  ],
  wishlist: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      image: String,
      price: Number,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
