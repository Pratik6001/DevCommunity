const mongoose = require("mongoose");
const Post = require("../models/post");
const Comment = require("../models/comment");
const { logActivity } = require("./activityLogger");
const { validationResult } = require("express-validator");

exports.getPosts = async (req, res) => {
  try {
    let { page = 1, limit = 10, search, ...filters } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const query = {};

    // Handle dynamic filters
    for (let key in filters) {
      if (key === "tags") {
        // tags can be comma-separated
        const tagsArray = Array.isArray(filters[key])
          ? filters[key]
          : filters[key].split(",");
        query[key] = { $in: tagsArray };
      } else if (key === "likes" || key === "shares" || key === "comments") {
        // filter by ObjectId arrays
        query[key] = { $in: [filters[key]] };
      } else {
        // generic filter
        query[key] = filters[key];
      }
    }

    // Full-text search
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      // .limit(limit)
      .populate("owner", "name avatar")
      .populate({
        path: "comments",
        populate: { path: "owner", select: "name avatar" },
      })
      .exec();

    const totalPosts = await Post.countDocuments(query);

    res.status(200).json({
      data: posts,
      total: totalPosts,
      page,
      limit,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createPost = async (req, res) => {
  try {
    // Validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, codeSnippet, language, tags } = req.body;

    const newPost = new Post({
      title,
      description,
      codeSnippet,
      language,
      tags,
      owner: req.user?.id,
    });
    logActivity({
      // userId: req.user?._id,
      action: "view",
      targetId: newPost._id,
      targetType: "post",
    });

    const savedPost = await newPost.save();
    res.status(201).json({ post: savedPost });
  } catch (err) {
    console.error("Create Post Error:", err);
    res.status(500).json({ error: "Failed to create post" });
  }
};

// Note: This is an updated version including comment-related endpoints.
// Assume you have Comment model imported.

// ... (other exports like createPost, likePost, etc., remain the same)

// Add Comment (top-level or reply)
exports.addComment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { postId } = req.params;
    const { content, parentCommentId } = req.body;

    if (!mongoose.isValidObjectId(postId)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    let parentComment = null;
    if (parentCommentId) {
      if (!mongoose.isValidObjectId(parentCommentId)) {
        return res.status(400).json({ error: "Invalid parent comment ID" });
      }
      parentComment = await Comment.findById(parentCommentId);
      if (!parentComment || parentComment.post.toString() !== postId) {
        return res.status(404).json({ error: "Parent comment not found" });
      }
    }

    const newComment = new Comment({
      content,
      owner: req.user.id,
      post: postId,
      parentComment: parentCommentId || null,
    });

    await newComment.save();

    if (parentComment) {
      parentComment.replies.push(newComment._id);
      await parentComment.save();
    } else {
      post.comments.push(newComment._id);
      await post.save();
    }

    await newComment.populate("owner", "username email");

    logActivity({
      action: "comment",
      targetId: post._id,
      targetType: "post",
    });

    res.status(201).json({ comment: newComment });
  } catch (err) {
    console.error("Add Comment Error:", err);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

// Get Nested Comments for a Post
exports.getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!mongoose.isValidObjectId(postId)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    // Fetch all comments for the post, populated with owner
    const comments = await Comment.find({ post: postId })
      .populate("owner", "username email")
      .sort({ createdAt: -1 });

    // Build the comment tree
    const commentTree = buildCommentTree(comments);

    // Sort replies recursively (latest first)
    sortCommentsByDate(commentTree);

    res.status(200).json({ comments: commentTree });
  } catch (err) {
    console.error("Get Comments Error:", err);
    res.status(500).json({ error: "Failed to get comments" });
  }
};

// Helper to build nested tree from flat list
function buildCommentTree(comments) {
  const commentMap = new Map();
  comments.forEach((comment) => {
    commentMap.set(comment._id.toString(), {
      ...comment.toObject(),
      replies: [],
    });
  });

  const tree = [];
  comments.forEach((comment) => {
    const commentObj = commentMap.get(comment._id.toString());
    if (comment.parentComment) {
      const parent = commentMap.get(comment.parentComment.toString());
      if (parent) {
        parent.replies.push(commentObj);
      }
    } else {
      tree.push(commentObj);
    }
  });
  return tree;
}

// Helper to sort comments and replies by createdAt desc
function sortCommentsByDate(comments) {
  comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  comments.forEach((comment) => {
    if (comment.replies) {
      sortCommentsByDate(comment.replies);
    }
  });
}
