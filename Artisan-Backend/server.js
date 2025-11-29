const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/auth");
const vendorRoutes = require("./routes/vendorRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

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
// Product Routes
app.use("/api/products", productRoutes);
// Order Routes
app.use("/api/orders", orderRoutes);
// Review Routes
app.use("/api/reviews", require("./routes/reviewRoutes"));
// Admin Routes
app.use("/api/admin", adminRoutes);
// User Routes
app.use("/api/user", userRoutes);