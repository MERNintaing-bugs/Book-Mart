const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  condition: { type: String, required: true },
  isbn: { type: String },
  publishedYear: { type: Number },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sellerName: { type: String, required: true },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema); 