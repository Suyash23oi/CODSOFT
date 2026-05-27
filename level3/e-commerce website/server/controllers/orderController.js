const Order = require('../models/Order');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
  if (!orderItems || orderItems.length === 0) return res.status(400).json({ message: 'No order items' });

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    taxPrice: 0,
    shippingPrice: 0,
  });

  const user = await User.findById(req.user._id);
  user.cart = [];
  await user.save();

  res.status(201).json(order);
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('orderItems.product', 'name image price');
  res.json(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    return res.status(403).json({ message: 'Not authorized to view this order' });
  }
  res.json(order);
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user', 'name email');
  res.json(orders);
};
