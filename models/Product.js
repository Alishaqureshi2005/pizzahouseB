const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Product content is required'],
    trim: true
  },
  price: {
    type: String,
    required: [true, 'Product price is required'],
    trim: true
  },
  image: {
    type: String,
    default: 'default-product.jpg'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product category is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 