const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL VENDORS
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await User.find({ role: "vendor" }).select("-password");
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// MAKE ADMIN
exports.makeAdmin = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    await user.save();

    res.json({ message: "User promoted to admin" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL PRODUCTS
exports.getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find().populate("vendor", "name email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE PRODUCT
exports.deleteProductAdmin = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL ORDERS
exports.getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE ORDER STATUS (Admin)
exports.updateOrderStatusAdmin = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({
      message: "Order status updated by admin",
      order
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};