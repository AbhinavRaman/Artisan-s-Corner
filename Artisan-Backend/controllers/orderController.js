const Order = require("../models/Order");
const Product = require("../models/Product");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// CREATE RAZORPAY ORDER
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body; // amount in paise expected from frontend

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const options = {
      amount: amount,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    return res.json({ success: true, order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// VERIFY PAYMENT SIGNATURE AND CREATE ORDER
exports.verifyAndCreateOrder = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, items, shippingAddress } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ message: "Missing payment verification fields" });
    }

    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid signature, payment verification failed' });
    }

    // Build order items and total similar to createOrder logic
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order." });
    }

    let orderItems = [];
    let total = 0;

    for (let i of items) {
      const product = await Product.findById(i.product);
      if (!product) return res.status(400).json({ message: "Invalid product: " + i.product });

      const quantity = i.quantity || 1;
      const price = product.price;

      orderItems.push({
        product: product._id,
        title: product.title,
        price,
        quantity,
        image: product.images?.[0] || "",
        vendor: product.vendor
      });

      total += price * quantity;
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice: total,
      shippingAddress,
      status: "pending",
      isPaid: true,
      paymentIntentId: razorpay_payment_id,
    });

    return res.status(201).json({ success: true, message: "Order created and payment verified", order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentIntentId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order." });
    }

    let orderItems = [];
    let total = 0;

    // Build order with product snapshot
    for (let i of items) {
      const product = await Product.findById(i.product);

      if (!product) {
        return res.status(400).json({ message: "Invalid product: " + i.product });
      }

      const quantity = i.quantity || 1;
      const price = product.price;

      orderItems.push({
        product: product._id,
        title: product.title,
        price,
        quantity,
        image: product.images?.[0] || "",
        vendor: product.vendor
      });

      total += price * quantity;
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice: total,
      shippingAddress,
      status: "pending",
      isPaid: paymentIntentId ? true : false,
      paymentIntentId,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET USER ORDERS (CUSTOMER)
exports.getMyOrders = async (req, res) => {
  try {
    const myOrders = await Order.find({ user: req.user._id });
    res.json(myOrders);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET VENDOR ORDERS
exports.getVendorOrders = async (req, res) => {
  try {
    const vendorOrders = await Order.find({ "items.vendor": req.user._id });

    res.json(vendorOrders);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// UPDATE ORDER STATUS (Vendor)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Ensure vendor only updates his own seller items
    const vendorOwned = order.items.some(
      (item) => item.vendor.toString() === req.user._id.toString()
    );

    if (!vendorOwned) {
      return res.status(403).json({ message: "Not allowed" });
    }

    order.status = status;
    await order.save();

    res.json({
      message: "Order status updated",
      order
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};