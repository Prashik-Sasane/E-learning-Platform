const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
} = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Authenticated routes
router.get("/me", authMiddleware, getMe);
router.post("/logout", authMiddleware, logoutUser);

module.exports = router;