const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Initialize SMTP transporter (REAL SMTP)
let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., "smtp.gmail.com"
  port: process.env.SMTP_PORT || 587, // 465 for SSL, 587 for TLS
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER, // your email
    pass: process.env.SMTP_PASS, // your email password or app-specific password
  },
});

// Verify transporter on server start
transporter.verify((err, success) => {
  if (err) {
    console.error("SMTP transporter verification failed:", err);
  } else {
    console.log("SMTP transporter is ready to send emails");
  }
});

// ------------------ SEND RESET EMAIL ------------------
exports.sendResetEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: `"DevCommunity" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <p>Hello ${user.username || "User"},</p>
        <p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    return res.status(200).json({
      message: "Password reset email sent",
    });
  } catch (err) {
    console.error("Error in sendResetEmail:", err);
    return res.status(500).json({ message: "Failed to send reset email" });
  }
};

// ------------------ RESET PASSWORD ------------------
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and new password are required" });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res
      .status(200)
      .json({ message: "Password has been reset successfully" });
  } catch (err) {
    console.error("Error in resetPassword:", err);
    return res.status(500).json({ message: "Failed to reset password" });
  }
};
