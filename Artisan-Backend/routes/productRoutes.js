const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  getMyProducts,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const { protect, authorizeRoles } = require("../middleware/auth");

// PUBLIC ROUTES
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

// VENDOR ROUTES
router.post("/", protect, authorizeRoles("vendor"), createProduct);
router.get("/vendor/my-products", protect, authorizeRoles("vendor"), getMyProducts);
router.put("/:id", protect, authorizeRoles("vendor"), updateProduct);
router.delete("/:id", protect, authorizeRoles("vendor"), deleteProduct);

module.exports = router;
