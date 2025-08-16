const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const rateLimiter = require("./middleware/rateLimiter");
const connectDB = require("./config/db.config");
const jwt = require("jsonwebtoken");
const { createServer } = require("http");
const { Server } = require("socket.io");
const authRoutes = require("./routes/auth");
const feedRoutes = require("./routes/feed");
const postRoutes = require("./routes/post");
const createUserProfile = require("./routes/userprofile");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const Message = require("./models/message");

const app = express();
const httpServer = createServer(app);

connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter());
// Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.IO Authentication Middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    console.error("No token provided");
    return next(new Error("Authentication error: No token provided"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded; // decoded should contain { id, username }
    console.log(`Authenticated user: ${decoded.username} (${decoded.id})`);
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    next(new Error(`Authentication error: ${err.message}`));
  }
});

// Socket.IO Logic
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.user.username} (${socket.id})`);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.user.username} joined room: ${roomId}`);
  });

  socket.on(
    "sendMessage",
    async ({ roomId, text, receiverId, sender, senderId }) => {
      try {
        console.log("Received sendMessage:", {
          roomId,
          text,
          receiverId,
          sender,
          senderId,
        });

        // Validate ObjectIDs
        if (
          !mongoose.isValidObjectId(senderId) ||
          !mongoose.isValidObjectId(receiverId)
        ) {
          console.error(
            `Invalid IDs - senderId: ${senderId}, receiverId: ${receiverId}`
          );
          throw new Error("Invalid senderId or receiverId");
        }

        // Generate and verify roomId
        const expectedRoomId = [senderId, receiverId].sort().join("_");
        if (roomId !== expectedRoomId) {
          console.error(
            `Room ID mismatch - received: ${roomId}, expected: ${expectedRoomId}`
          );
          throw new Error("Invalid roomId");
        }

        // Save message to database
        const message = new Message({
          roomId: expectedRoomId, // Use expectedRoomId to ensure consistency
          senderId,
          receiverId,
          text,
          timestamp: new Date(),
        });
        await message.save();
        console.log(`Message saved: ${message._id}`);

        // Prepare message payload
        const messagePayload = {
          text,
          sender,
          senderId,
          roomId: expectedRoomId,
          timestamp: message.timestamp.toISOString(),
        };

        // Emit to the room (receiver) and sender
        io.to(expectedRoomId).emit("receiveMessage", messagePayload);
        socket.emit("receiveMessage", messagePayload); // Ensure sender receives their own message
      } catch (err) {
        console.error("Error processing message:", err.message, {
          senderId,
          receiverId,
          roomId,
        });
        socket.emit("error", {
          message: `Failed to process message: ${err.message}`,
        });
      }
    }
  );

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.user.username} (${socket.id})`);
  });
});

// Routes
app.use("/auth", authRoutes);
app.use("/api", feedRoutes);
app.use("/api", postRoutes);
app.use("/api", createUserProfile);
app.use("/api", userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
