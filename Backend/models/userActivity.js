// models/userActivity.js
const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: { type: String, enum: ["view", "like", "bookmark"], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true }, // e.g. postId, resourceId
  targetType: { type: String, enum: ["post", "resource"], required: true },
  metadata: { type: Object, default: {} }, // optional details (e.g., device, location)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserActivity", userActivitySchema);
