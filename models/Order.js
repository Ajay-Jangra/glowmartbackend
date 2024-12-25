const mongoose = require('mongoose');

// Address schema updated according to the new structure
const AddressSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    line1: { type: String, required: [true, 'Address line 1 is required'] },
    line2: { type: String },
    city: { type: String, required: [true, 'City is required'] },
    state: { type: String, required: [true, 'State is required'] }, // Added state field
    country: { type: String, required: [true, 'Country is required'] }, // Added country field
    zip: { type: String, required: [true, 'ZIP code is required'] },
    mobile: { type: String, required: [true, 'Mobile number is required'] }, // Added mobile field
});

// Order item schema updated to include `name`, `image`, `price`, `discount`, and `quantity`
const OrderItemSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Item name is required'] },
    image: { type: String, required: [true, 'Image URL is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    discount: { type: Number, required: true, default: 0 },
    quantity: { type: Number, required: [true, 'Quantity is required'], min: 1 },
});

// Main Order schema updated to reflect the new structure
const OrderSchema = new mongoose.Schema({
    orderId: { type: String, required: [true, 'Order ID is required'], unique: true },
    address: {
        type: AddressSchema,
        required: [true, 'Shipping address is required'],
    },
    orderItems: {
        type: [OrderItemSchema],
        required: [true, 'Order items are required'],
    },
    totalAmount: { type: Number, required: [true, 'Total amount is required'] },
    paymentMethod: {
        type: String,
        enum: ['cod', 'online'],
        required: [true, 'Payment method is required'],
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending',
    },
    paymentId: { type: String }, // Optional field
    orderStatus: { type: String, default: 'Pending' }, // Default status is 'Pending'
    createdAt: { type: Date, default: Date.now },
});

// Export the order model
module.exports = mongoose.model('Order', OrderSchema);
