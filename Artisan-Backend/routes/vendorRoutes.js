const express = require("express");
const router = express.Router();

const {
    getVendorProfile,
    updateVendorShop,
    getPublicVendorShop
} = require("../controllers/vendorcontroller");

const { protect, authorizeRoles } = require("../middleware/auth");

// Vendor-only routes

router.get("/profile", protect, authorizeRoles("vendor"), getVendorProfile);
router.put("/update-shop", protect, authorizeRoles("vendor"), updateVendorShop);

// Public route to get vendor shop details
router.get("/:id", getPublicVendorShop);

module.exports = router;
