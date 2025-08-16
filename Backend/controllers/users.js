const User = require("../models/user");
const Message = require("../models/message");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.getRoomMessage = async (req, res) => {
  const { receiverId } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (
      !mongoose.isValidObjectId(receiverId) ||
      !mongoose.isValidObjectId(userId)
    ) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const roomId = [userId, receiverId].sort().join("_");
    const messages = await Message.find({ roomId })
      .populate("senderId", "username")
      .sort({ timestamp: 1 })
      .lean();

    res.json(
      messages.map((msg) => ({
        text: msg.text,
        sender: msg.senderId?.username || "Unknown",
        senderId: msg.senderId?._id,
        roomId: msg.roomId,
        timestamp: msg.timestamp.toISOString(),
      }))
    );
  } catch (err) {
    console.error("Error fetching messages:", err.message);
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
};
