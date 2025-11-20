const User = require("../models/User");

// Get vendor profile
exports.getVendorProfile = async (req, res) => {
  try {
    const vendor = await User.findById(req.user._id).select("-password");

    if (vendor.role !== "vendor") {
      return res.status(403).json({ message: "You are not a vendor" });
    }

    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update vendor shop details
exports.updateVendorShop = async (req, res) => {
  try {
    const { name, description, banner, logo } = req.body;

    const vendor = await User.findById(req.user._id);

    if (vendor.role !== "vendor") {
      return res.status(403).json({ message: "You are not a vendor" });
    }

    vendor.shop.name = name || vendor.shop.name;
    vendor.shop.description = description || vendor.shop.description;
    vendor.shop.banner = banner || vendor.shop.banner;
    vendor.shop.logo = logo || vendor.shop.logo;

    await vendor.save();

    res.json({
      message: "Vendor shop updated successfully",
      shop: vendor.shop
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get public vendor shop (for customers)
exports.getPublicVendorShop = async (req, res) => {
  try {
    const vendor = await User.findById(req.params.id).select("name shop");

    if (!vendor || vendor.role !== "vendor") {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};