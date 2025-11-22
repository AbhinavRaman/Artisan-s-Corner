const Product = require("../models/Product");

// CREATE Product (Vendor only)
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, images, stock, category } = req.body;

    const product = await Product.create({
      vendor: req.user._id,
      title,
      description,
      price,
      images,
      stock,
      category
    });

    res.status(201).json({
      message: "Product created successfully",
      product
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET all products (Public)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("vendor", "name shop");
    res.json(products);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET single product (Public)
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("vendor", "name shop");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET vendor products (Vendor only)
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user._id });
    res.json(products);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// UPDATE product (Vendor only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.vendor.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });

    const { title, description, price, images, stock, category } = req.body;

    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.images = images ?? product.images;
    product.stock = stock ?? product.stock;
    product.category = category ?? product.category;

    await product.save();

    res.json({ message: "Product updated", product });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE Product (Vendor only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.vendor.toString() !== req.user.__id.toString())
      return res.status(403).json({ message: "Not allowed" });

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};