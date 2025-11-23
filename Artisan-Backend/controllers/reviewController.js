const Review = require("../models/Review");
const Order = require("../models/Order");

// CREATE review (Customer only)
exports.createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    // Check if user purchased the product
    const hasOrdered = await Order.findOne({
      user: req.user._id,
      "items.product": productId
    });

    if (!hasOrdered) {
      return res.status(400).json({
        message: "You can only review products you purchased."
      });
    }

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      rating,
      comment
    });

    res.status(201).json({
      message: "Review posted successfully",
      review
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "You already reviewed this product."
      });
    }

    res.status(500).json({ message: err.message });
  }
};


// GET product reviews (public)
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.id })
      .populate("user", "name");

    res.json(reviews);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
