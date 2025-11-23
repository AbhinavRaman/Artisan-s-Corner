const express = require("express");
const router = express.Router();

const { createReview, getProductReviews } = require("../controllers/reviewController");

const { protect } = require("../middleware/auth");

// CUSTOMER — Post review
router.post("/", protect, createReview);

// PUBLIC — Get all reviews for product
router.get("/:id", getProductReviews);

module.exports = router;
