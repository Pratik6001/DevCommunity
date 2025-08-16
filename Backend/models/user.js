// // models/User.js
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   // Basic user fields
//   username: {
//     type: String,
//     required: true,
//     trim: true,
//     unique: true,
//   },

//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     unique: true,
//     match: [/.+@.+\..+/, "Please use a valid email address"],
//   },

//   password: {
//     type: String,
//     required: true,
//   },

//   role: {
//     type: String,
//     enum: ["admin", "user"],
//     default: "user",
//   },

//   // Profile-related fields
//   avatar: {
//     type: String,
//     default: null, // URL of avatar image
//   },
//   bio: {
//     type: String,
//     maxlength: 500,
//     trim: true,
//     default: "",
//   },
//   skills: {
//     type: [String],
//     default: [],
//   },
//   github: {
//     type: String,
//     trim: true,
//     default: "",
//   },
//   linkedin: {
//     type: String,
//     trim: true,
//     default: "",
//   },
//   website: {
//     type: String,
//     trim: true,
//     default: "",
//   },

//   // Profile completion status
//   profileComplete: {
//     type: Boolean,
//     default: false, // false until user fills profile
//   },

//   // Timestamps
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Auto-update updatedAt before saving
// userSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/.+@.+\..+/, "Please use a valid email address"],
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    avatar: {
      type: String,
      default: null, // profile picture URL
    },

    bio: {
      type: String,
      maxlength: 500,
      trim: true,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    github: { type: String, trim: true, default: "" },
    linkedin: { type: String, trim: true, default: "" },
    website: { type: String, trim: true, default: "" },

    profileComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // adds createdAt + updatedAt automatically
);

module.exports = mongoose.model("User", userSchema);
