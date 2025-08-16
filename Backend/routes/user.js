const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");
const { authenticateToken } = require("../middleware/authMiddleware");

router.get("/get-all-user", authenticateToken, userController.getAllUser);

router.get(
  "/messages/:receiverId",
  authenticateToken,
  userController.getRoomMessage
);

module.exports = router;
