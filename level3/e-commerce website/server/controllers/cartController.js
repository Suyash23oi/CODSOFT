const User = require('../models/User');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user.cart || []);
};

exports.updateCart = async (req, res) => {
  const { cartItems } = req.body;
  const user = await User.findById(req.user._id);
  user.cart = cartItems;
  await user.save();
  res.json(user.cart);
};

exports.addToCart = async (req, res) => {
  const { productId, qty } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const user = await User.findById(req.user._id);
  const cartItem = user.cart?.find((item) => item.product.toString() === productId);
  if (cartItem) {
    cartItem.qty = Math.min(product.countInStock, cartItem.qty + Number(qty));
  } else {
    user.cart = user.cart || [];
    user.cart.push({ product: product._id, name: product.name, image: product.image, price: product.price, qty: Number(qty) });
  }
  await user.save();
  res.json(user.cart);
};

exports.removeFromCart = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.cart = user.cart.filter((item) => item.product.toString() !== req.params.productId);
  await user.save();
  res.json(user.cart);
};
