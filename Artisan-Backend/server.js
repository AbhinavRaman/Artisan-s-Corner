const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/auth");
const vendorRoutes = require("./routes/vendorRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// DB
connectDB();

// Health Route
app.get("/", (req, res) => {
  res.send("Artisan API is running...");
});

// Protected Route Example
app.get("/api/test-protected", protect, (req, res) => {
  res.json({
    message: "You accessed a protected route!",
    user: req.user
  });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Routes
app.use("/api/auth", authRoutes);

// Vendor Routes
app.use("/api/vendor", vendorRoutes);