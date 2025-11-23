const express = require("express");
const router = express.Router();

const {
  getMyProfile,
  updateMyProfile,
  changePassword
} = require("../controllers/userController");

const { protect } = require("../middleware/auth");

router.get("/me", protect, getMyProfile);
router.put("/me", protect, updateMyProfile);
router.put("/change-password", protect, changePassword);

module.exports = router;
