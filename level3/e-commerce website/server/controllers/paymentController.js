const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');
const Order = require('../models/Order');

exports.createPaymentIntent = async (req, res) => {
  const { amount, orderId } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'usd',
    metadata: { orderId },
  });
  res.json({ clientSecret: paymentIntent.client_secret });
};

exports.recordPayment = async (req, res) => {
  const { orderId, paymentId, amount, status, currency } = req.body;
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.isPaid = status === 'succeeded';
  order.paidAt = new Date();
  order.paymentResult = { id: paymentId, status, update_time: new Date().toISOString(), email_address: req.user.email };
  await order.save();

  const payment = await Payment.create({
    user: req.user._id,
    order: order._id,
    paymentId,
    amount,
    status,
    currency,
  });

  res.json({ order, payment });
};
