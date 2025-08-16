// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");

// dotenv.config();
// const JWT_SECRET = process.env.JWT_SECRET;
// const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
//   console.error(
//     "FATAL ERROR: JWT_SECRET or JWT_REFRESH_SECRET is not defined in .env. Please add them."
//   );
//   process.exit(1);
// }

// // Generate Access Token (short-lived)
// const generateAccessToken = (user) => {
//   const payload = {
//     id: user._id,
//     username: user.username,
//     email: user.email,
//     role: user?.role,
//   };
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" }); // short-lived token
// };

// // Generate Refresh Token (long-lived)
// const generateRefreshToken = (user) => {
//   const payload = { id: user._id };
//   return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" }); // refresh token
// };

// // Authenticate Access Token middleware
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Authentication required: No token provided." });
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res
//         .status(403)
//         .json({ message: "Authentication failed: Invalid or expired token." });
//     }
//     req.user = user;
//     next();
//   });
// };

// // Refresh token endpoint
// const refreshToken = (req, res) => {
//   const { token } = req.body;
//   if (!token)
//     return res.status(401).json({ message: "Refresh token required" });

//   jwt.verify(token, JWT_REFRESH_SECRET, (err, user) => {
//     if (err)
//       return res
//         .status(403)
//         .json({ message: "Invalid or expired refresh token" });

//     // Here you can optionally check if refresh token exists in DB or blacklist
//     const accessToken = generateAccessToken({ _id: user.id });
//     res.json({ accessToken });
//   });
// };

// module.exports = {
//   generateAccessToken,
//   generateRefreshToken,
//   authenticateToken,
//   refreshToken,
// };
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  console.error(
    "FATAL ERROR: JWT_SECRET or JWT_REFRESH_SECRET is not defined in .env. Please add them."
  );
  process.exit(1);
}

// Generate Access Token (short-lived)
const generateAccessToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user?.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};

// Generate Refresh Token (long-lived)
const generateRefreshToken = (user) => {
  const payload = { id: user._id };
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

// Authenticate Access Token middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.warn("No token provided in Authorization header");
    return res
      .status(401)
      .json({ message: "Authentication required: No token provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res
        .status(403)
        .json({ message: "Authentication failed: Invalid or expired token." });
    }
    req.user = user;
    console.log("Token verified, user:", user);
    next();
  });
};

// Refresh token endpoint handler
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    console.warn("No refresh token provided in request body");
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const user = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    const accessToken = generateAccessToken({ _id: user.id });
    console.log("New access token generated for user ID:", user.id);
    res.json({ accessToken });
  } catch (err) {
    console.error("Refresh token verification failed:", err.message);
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  authenticateToken,
  refreshToken,
};
