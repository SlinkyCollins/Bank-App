const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const { getAllUsers, getAllTransactions } = require("../Controllers/admin.Controller");

// Middleware to check admin role
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.get("/transactions", authMiddleware, adminMiddleware, getAllTransactions);

module.exports = router;