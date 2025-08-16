const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const connectDB = async () => {
  const maxRetries = parseInt(process.env.DB_MAX_RETRIES) || 5;
  const retryDelay = parseInt(process.env.DB_RETRY_DELAY) || 5000;
  let retries = maxRetries;
  while (retries) {
    try {
      const uri = process.env.MONGODB_URI;

      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected successfully");
      return;
    } catch (error) {
      console.error("MongoDB connection error:", error.message);
      retries -= 1;
      if (!retries) break;
      console.log(`Retrying connection in ${retryDelay / 1000} seconds...`);
      await new Promise((res) => setTimeout(res, retryDelay));
    }
  }
  console.error("Failed to connect to MongoDB after multiple attempts");
  process.exit(1);
};
module.exports = connectDB;
