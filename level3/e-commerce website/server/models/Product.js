const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true, default: 0 },
  image: { type: String, required: true },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  reviews: [reviewSchema],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
