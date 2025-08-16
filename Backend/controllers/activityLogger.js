const UserActivity = require("../models/userActivity");

exports.logActivity = async ({
  userId,
  action,
  targetId,
  targetType,
  metadata = {},
}) => {
  try {
    await UserActivity.create({
      userId,
      action,
      targetId,
      targetType,
      metadata,
    });
  } catch (err) {
    console.error("Error logging activity:", err.message);
  }
};
