const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middleware/auth");
const Review = require("../models/Review");
const Product = require("../models/Product");

// CREATE REVIEW
router.post("/:productId", protect, authorizeRoles("customer"), async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;

    // Find product
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check duplicate review
    const existingReview = await Review.findOne({
      product: productId,
      user: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({ message: "You already reviewed this product" });
    }

    // Create review
    const review = await Review.create({
      product: productId,
      user: req.user._id,
      rating,
      comment,
    });

    res.status(201).json(review);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET REVIEWS FOR PRODUCT
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "name");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
