const Order = require("../models/Order");
const Product = require("../models/Product");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

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
      isPaid: false
    });

    res.status(201).json({
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