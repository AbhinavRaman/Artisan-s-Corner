const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET logged-in user's profile
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE profile (name, email)
exports.updateMyProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    // return clean user object
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      shop: user.shop || null
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// CHANGE PASSWORD
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await user.matchPassword(currentPassword);
    if (!match)
      return res.status(400).json({ message: "Incorrect current password" });

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
