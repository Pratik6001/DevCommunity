const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/userprofile");
const { authenticateToken } = require("../middleware/authMiddleware");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/create-profile",
  authenticateToken,
  upload.single("avatar"),
  userProfileController.userProfile
);

module.exports = router;
