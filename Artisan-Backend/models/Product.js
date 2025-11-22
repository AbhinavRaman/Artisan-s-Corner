const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
  },

  price: {
    type: Number,
    required: true
  },

  images: [{
    type: String   // will store image URLs for now
  }],

  stock: {
    type: Number,
    default: 1
  },

  category: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Product", ProductSchema);