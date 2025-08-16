const User = require("../models/user");

exports.userProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { bio, skills, github, linkedin, website } = req.body;

    if (req.file) {
      user.avatar = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;
    }

    user.bio = bio || user.bio || "";
    user.skills = skills ? JSON.parse(skills) : user.skills || [];
    user.github = github || user.github || "";
    user.linkedin = linkedin || user.linkedin || "";
    user.website = website || user.website || "";

    if (!user.profileComplete) user.profileComplete = true;

    await user.save();

    res
      .status(200)
      .json({ message: "Profile updated successfully", profile: user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
