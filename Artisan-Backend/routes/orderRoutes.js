const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getVendorOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const { protect, authorizeRoles } = require("../middleware/auth");

// CUSTOMER
router.post("/", protect, createOrder);  
router.get("/my-orders", protect, getMyOrders);

// VENDOR
router.get("/vendor-orders", protect, authorizeRoles("vendor"), getVendorOrders);
router.put("/:id/status", protect, authorizeRoles("vendor"), updateOrderStatus);

module.exports = router;