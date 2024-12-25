const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
// Route to create a new order
router.post('/create', async (req, res) => {
    try {
        const {
            orderId,
            address,
            orderItems,
            totalAmount,
            paymentMethod,
            paymentStatus = 'Pending',
            paymentId = null,
            orderStatus = 'Pending', // Default to 'Pending' if not provided
        } = req.body;

        // Validate required fields
        if (!orderId || !address || !orderItems || !totalAmount || !paymentMethod) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Ensure orderItems is an array and has at least one item
        if (!Array.isArray(orderItems) || orderItems.length === 0) {
            return res.status(400).json({ message: 'Order items must be an array with at least one item' });
        }

        // Validate address fields
        if (!address.name || !address.line1 || !address.city || !address.state || !address.country || !address.zip || !address.mobile) {
            return res.status(400).json({ message: 'All address fields are required' });
        }

        // Validate each order item for required fields
        for (const item of orderItems) {
            if (!item.name || !item.image || !item.price || !item.discount || !item.quantity) {
                return res.status(400).json({ message: 'Each order item must have name, image, price, discount, and quantity' });
            }
        }

        // Create a new order document with the received details
        const newOrder = new Order({
            orderId,
            address,
            orderItems,
            totalAmount,
            paymentMethod,
            paymentStatus,
            paymentId,
            orderStatus, // Include orderStatus explicitly
        });

        // Save the new order in the database
        const savedOrder = await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    } catch (error) {
        console.error('Error saving order:', error.message);
        res.status(500).json({ message: 'Failed to save order', error: error.message });
    }
});


// Route to fetch all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
});


// Route to fetch an order by ID
router.get('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const order = await Order.findOne({ orderId: id });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
             
        }

        res.json({ orderStatus: order.orderStatus });
    } catch (error) {
        console.error('Error fetching order status:', error.message);
        res.status(500).json({ message: 'Failed to fetch order status', error: error.message });
    }
});


module.exports = router;
