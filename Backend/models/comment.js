const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 1000,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.index({ post: 1, createdAt: -1 });
commentSchema.index({ parentComment: 1 });

module.exports = mongoose.model("Comment", commentSchema);
