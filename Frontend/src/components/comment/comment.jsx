import { useState, useEffect } from "react";
import { User } from "lucide-react";

// Replace with your backend URL
const API_BASE_URL = "http://localhost:3000"; // Adjust to your backend port

// Recursive comment component
const CommentThread = ({ comment, onReply, depth = 0 }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = () => {
    if (replyText.trim() === "") return;
    onReply(comment.id, replyText);
    setReplyText("");
    setShowReplyBox(false);
  };

  return (
    <div style={{ marginLeft: depth * 20 }} className="mt-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-400" />
        </div>
        <div className="flex-1">
          <p className="text-gray-200">{comment.text}</p>
          <p className="text-xs text-gray-500">
            {comment.owner?.username || "Anonymous"} •{" "}
            {new Date(comment.createdAt).toLocaleString()}
          </p>
          <button
            onClick={() => setShowReplyBox((prev) => !prev)}
            className="text-sm text-gray-400 hover:underline mt-1"
          >
            Reply
          </button>
          {showReplyBox && (
            <div className="mt-2">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={1}
                placeholder="Write a reply..."
                className="w-full text-sm border border-gray-700 rounded-lg px-3 py-2 bg-black text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 resize-none"
              />
              <button
                onClick={handleReplySubmit}
                disabled={replyText.trim() === ""}
                className="mt-2 px-3 py-1 text-sm font-medium bg-white text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reply
              </button>
            </div>
          )}
          {comment.replies?.map((reply) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function CommentsSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  console.log(postId, "getting post id");

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/${postId}/comments`);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      const mappedComments = data.comments.map(mapToFrontend);
      setComments(mappedComments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const addComment = async (parentId, text) => {
    const tempId = Date.now();
    const newCommentObj = {
      id: tempId,
      text,
      replies: [],
      owner: { username: "You" }, // Placeholder for optimistic UI
      createdAt: new Date(),
    };

    setComments((prev) => {
      if (!parentId) {
        return [newCommentObj, ...prev];
      }
      return updateRepliesInTree(prev, parentId, newCommentObj);
    });

    try {
      const response = await fetch(`${API_BASE_URL}/api/${postId}/comments`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // Add Authorization header if required
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: text, parentCommentId: parentId }),
      });

      if (!response.ok) {
        throw new Error("Failed to save comment");
      }

      const { comment: realComment } = await response.json();

      setComments((prev) =>
        replaceTempWithReal(prev, tempId, {
          id: realComment._id,
          text: realComment.content,
          replies: [],
          owner: realComment.owner,
          createdAt: realComment.createdAt,
        })
      );
    } catch (error) {
      console.error("Comment save error:", error);
      alert("Failed to save comment!");
      setComments((prev) => removeCommentById(prev, tempId));
    }
  };

  const handlePostComment = () => {
    if (newComment.trim() === "") return;
    addComment(null, newComment);
    setNewComment("");
  };

  return (
    <div className="mt-4 space-y-8">
      <hr className="border-0 h-[1px] bg-[#303030]" />
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-400" />
        </div>
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows={1}
            className="w-full text-sm border border-gray-700 rounded-lg px-3 py-4 bg-black text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 resize-none"
          />
          <button
            onClick={handlePostComment}
            disabled={newComment.trim() === ""}
            className="mt-2 px-4 py-1.5 text-sm font-medium bg-white text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Comment
          </button>
        </div>
      </div>
      {comments.length === 0 ? (
        <p className="text-center text-gray-400 text-sm">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        comments.map((comment) => (
          <CommentThread
            key={comment.id}
            comment={comment}
            onReply={addComment}
          />
        ))
      )}
    </div>
  );
}

const mapToFrontend = (comment) => ({
  id: comment._id,
  text: comment.content,
  owner: comment.owner,
  createdAt: comment.createdAt,
  replies: comment.replies ? comment.replies.map(mapToFrontend) : [],
});

const updateRepliesInTree = (comments, parentId, newCommentObj) => {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return { ...comment, replies: [newCommentObj, ...comment.replies] };
    }
    return {
      ...comment,
      replies: updateRepliesInTree(comment.replies, parentId, newCommentObj),
    };
  });
};

const replaceTempWithReal = (comments, tempId, realComment) => {
  return comments.map((comment) => {
    if (comment.id === tempId) {
      return {
        ...comment,
        id: realComment.id,
        text: realComment.text,
        owner: realComment.owner,
        createdAt: realComment.createdAt,
      };
    }
    return {
      ...comment,
      replies: replaceTempWithReal(comment.replies, tempId, realComment),
    };
  });
};

const removeCommentById = (comments, idToRemove) => {
  return comments
    .filter((comment) => comment.id !== idToRemove)
    .map((comment) => ({
      ...comment,
      replies: removeCommentById(comment.replies, idToRemove),
    }));
};
