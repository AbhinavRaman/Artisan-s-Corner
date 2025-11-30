const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },

    title: String,
    price: Number,
    quantity: Number,
    image: String,
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [OrderItemSchema],

    totalPrice: {
        type: Number,
        required: true
    },

    shippingAddress: {
        name: String,
        address: String,
        city: String,
        postalCode: String,
        country: String
    },

    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
        default: 'Pending'
    },

    isPaid: {
        type: Boolean,
        default: false
    },

    paidAt: Date,

    paymentIntentId: String,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);