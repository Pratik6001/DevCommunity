const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/authMiddleware");

const { Login, SignUp } = require("../controllers/auth");
const passwordReset = require("../controllers/password");

router.post("/signup", SignUp);
router.post("/login", Login);

router.post(
  "/send-reset-email",
  authenticateToken,
  passwordReset.sendResetEmail
);

router.post("/reset-password", authenticateToken, passwordReset.resetPassword);

module.exports = router;
