const express = require('express');
const Product = require('../models/Product');

const router = express.Router();


// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch products from MongoDB
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }
});
   

router.post('/', async (req, res) => {
    const { name, description, image, price } = req.body;

    try {
        const product = await Product.create({ name, description, image, price });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: 'Error adding product', error });
    }
});

module.exports = router;

