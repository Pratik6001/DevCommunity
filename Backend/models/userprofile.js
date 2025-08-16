// models/UserProfile.js
const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to a User model (assumed)
    required: true,
    unique: true,
  },
  avatar: {
    type: String, // Store URL to the avatar image (e.g., for future implementation)
    default: null,
  },
  bio: {
    type: String,
    maxlength: 500,
    trim: true,
    default: "",
  },
  skills: {
    type: [String], // Array of strings for skills
    default: [],
  },
  github: {
    type: String,
    trim: true,
    default: "",
    match: [
      /^https?:\/\/(www\.)?github\.com\/.+$/,
      "Please enter a valid GitHub URL",
    ],
  },
  linkedin: {
    type: String,
    trim: true,
    default: "",
    match: [
      /^https?:\/\/(www\.)?linkedin\.com\/.+$/,
      "Please enter a valid LinkedIn URL",
    ],
  },
  website: {
    type: String,
    trim: true,
    default: "",
    match: [/^https?:\/\/.+$/, "Please enter a valid website URL"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update `updatedAt` timestamp on save
userProfileSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
