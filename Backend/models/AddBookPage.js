const mongoose = require('mongoose');

const addBookPageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  condition: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  description: { type: String, required: true },
  isbn: { type: String },
  publishedYear: { type: Number },
  image: { type: String },
  sellerId: { type: String, required: true },
  sellerName: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('AddBookPage', addBookPageSchema);
