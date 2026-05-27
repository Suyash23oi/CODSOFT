const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/project-management';

  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI is not set. Using local MongoDB fallback:', uri);
  }

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');
};

module.exports = connectDB;
