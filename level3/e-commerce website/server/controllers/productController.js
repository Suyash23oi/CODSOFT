const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const { keyword = '', category, minPrice, maxPrice } = req.query;
  const query = {
    name: { $regex: keyword, $options: 'i' },
  };
  if (category) query.category = category;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const products = await Product.find(query).sort({ createdAt: -1 });
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

exports.createProduct = async (req, res) => {
  const { name, description, category, price, countInStock, image } = req.body;
  const product = await Product.create({ name, description, category, price, countInStock, image });
  res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const updates = ['name', 'description', 'category', 'price', 'countInStock', 'image'];
  updates.forEach((field) => {
    if (req.body[field] !== undefined) product[field] = req.body[field];
  });

  await product.save();
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  await product.remove();
  res.json({ message: 'Product removed' });
};
