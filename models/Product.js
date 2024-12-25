// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Document ID (as in your data)
    disc: { type: String, required: true }, // Description
    discount: { type: Number, required: true }, // Discount percentage
    id: { type: Number, required: true }, // Product ID
    image: { type: String, required: true }, // Image URL
    price: { type: Number, required: true }, // Price of the product
    rating: { type: Number, required: true }, // Rating (e.g., 1-5)
    title: { type: String, required: true }, // Product title
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create a model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
