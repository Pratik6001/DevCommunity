const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/user");
const { generateAccessToken } = require("../middleware/authMiddleware");
const bcrypt = require("bcryptjs");

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(404).json({ message: "Email not found." });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch && findUser.password !== password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const { role: userRoles, username, _id } = findUser;
    let url = "";

    if (userRoles.length === 1 && userRoles.includes("user")) {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    if (userRoles.includes("admin")) {
      url = `${process.env.FRONTEND_URL}/admin`;
    } else if (userRoles.includes("user")) {
      url = `${process.env.FRONTEND_URL}`;
    } else {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    const token = await generateAccessToken(findUser);

    return res.status(200).json({
      message: `Redirecting to ${url}`,
      url,
      user: {
        username,
        role: userRoles,
        id: _id,
        profileComplete: findUser.profileComplete,
      },
      token,
    });
  } catch (error) {
    console.error("Error during dashboard redirection:", error);
    return res.status(500).json({
      error: "An error occurred during dashboard access. Please try again.",
    });
  }
};

const SignUp = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log("Received signup request:", req.body);
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username: name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    const token = await generateAccessToken(user);
    return res.status(200).json({ message: "Sign in successful", token, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { Login, SignUp };
