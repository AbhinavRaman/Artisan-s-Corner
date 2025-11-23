const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getAllVendors,
  deleteUser,
  makeAdmin,
  getAllProductsAdmin,
  deleteProductAdmin,
  getAllOrdersAdmin,
  updateOrderStatusAdmin
} = require("../controllers/adminController");

const { protect, authorizeRoles } = require("../middleware/auth");

router.use(protect, authorizeRoles("admin")); // All admin routes protected

// USERS
router.get("/users", getAllUsers);
router.get("/vendors", getAllVendors);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/make-admin", makeAdmin);

// PRODUCTS
router.get("/products", getAllProductsAdmin);
router.delete("/products/:id", deleteProductAdmin);

// ORDERS
router.get("/orders", getAllOrdersAdmin);
router.put("/orders/:id/status", updateOrderStatusAdmin);

module.exports = router;
