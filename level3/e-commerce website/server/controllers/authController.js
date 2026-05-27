const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already registered' });

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashed });
  const token = generateToken(user._id);

  res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
    token,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(user._id);
  res.json({ user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }, token });
};

exports.getProfile = async (req, res) => {
  if (!req.user) return res.status(404).json({ message: 'User not found' });
  res.json(req.user);
};
