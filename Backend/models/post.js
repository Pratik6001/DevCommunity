const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    codeSnippet: {
      type: String,
      default: "",
      maxlength: 100000,
    },
    language: {
      type: String,
      trim: true,
      enum: [
        "javascript",
        "typescript",
        "python",
        "java",
        "c++",
        "go",
        "ruby",
        "",
      ],
      default: "",
    },
    tags: {
      type: [String],
      validate: [(val) => val.length <= 5, "Maximum 5 tags allowed"],
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    shares: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

// Add indexes for better query performance
PostSchema.index({ owner: 1, createdAt: -1 });
PostSchema.index({ title: "text", description: "text", codeSnippet: "text" });

module.exports = mongoose.model("Post", PostSchema);
