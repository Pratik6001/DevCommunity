const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/authMiddleware");

const postController = require("../controllers/post");

router.get("/get-all-data", postController.getPosts);
router.post("/create-post", authenticateToken, postController.createPost);
router.post("/:postId/comments", authenticateToken, postController.addComment);
router.get("/:postId/comments", postController.getPostComments); // No auth needed for viewing, or add if required
module.exports = router;
