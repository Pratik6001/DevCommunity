// // import { useState } from "react";
// // import { Heart, MessageCircle, Clock, User, Send } from "lucide-react";
// // import CommentsSection from "../comment/comment";

// // export default function PostCard({
// //   ownerLogin,
// //   name,
// //   description,
// //   primaryCategory,
// //   secondaryCategory,
// //   stars,
// //   iconSvg,
// // }) {
// //   const [showComments, setShowComments] = useState(false);
// //   const [newComment, setNewComment] = useState("");
// //   const [comments, setComments] = useState([
// //     { pseudonym: "John", createdAt: new Date(), content: "Nice post!" },
// //     { pseudonym: "Jane", createdAt: new Date(), content: "Looks great!" },
// //   ]);

// //   const getPostTimeAgo = (date) => {
// //     const diff = Math.floor((new Date() - date) / 1000 / 60);
// //     return diff < 1 ? "just now" : `${diff} min ago`;
// //   };

// //   const handlePostComment = () => {
// //     if (!newComment.trim()) return;
// //     setComments([
// //       ...comments,
// //       { pseudonym: "You", createdAt: new Date(), content: newComment },
// //     ]);
// //     setNewComment("");
// //   };

// //   return (
// //     <div className="p-6 m-4 bg-[#0A0A0A] text-white border border-gray-700 rounded-lg space-y-8 shadow-md relative">
// //       {/* Top Row */}
// //       <div className="flex justify-start items-center space-x-3">
// //         <div
// //           className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
// //           dangerouslySetInnerHTML={{ __html: iconSvg || "" }}
// //         />
// //         <div className="flex flex-col">
// //           <div className="flex items-center space-x-2">
// //             <p className="text-sm font-semibold">{ownerLogin}</p>
// //             <div className="flex items-center text-xs space-x-1">
// //               <Clock className="w-3 h-3" />
// //               <span>{getPostTimeAgo(new Date())}</span>
// //             </div>
// //           </div>
// //           <div className="text-lg font-bold">{name}</div>
// //         </div>
// //       </div>

// //       {/* Content */}
// //       <div className="space-y-2">
// //         <p className="text-sm text-white">{description}</p>
// //         <div className="flex gap-2">
// //           <span className="bg-[#262626] px-2 pb-1 text-xs rounded-md">
// //             {primaryCategory}
// //           </span>
// //           {secondaryCategory && (
// //             <span className="bg-[#262626] px-2 pb-1 text-xs rounded-md">
// //               {secondaryCategory}
// //             </span>
// //           )}
// //         </div>
// //       </div>

// //       {/* Footer */}
// //       <div className="flex space-x-6 text-sm text-gray-400">
// //         <div className="flex items-center space-x-1 cursor-pointer">
// //           <Heart className="w-5 h-5" /> <span>{stars || 0}</span>
// //         </div>
// //         <div
// //           onClick={() => setShowComments(!showComments)}
// //           className="flex items-center space-x-1 cursor-pointer"
// //         >
// //           <MessageCircle className="w-5 h-5" /> <span>{comments.length}</span>
// //         </div>
// //         <Send className="cursor-pointer w-5 h-5" />
// //       </div>

// //       {showComments && <CommentsSection />}
// //     </div>
// //   );
// // }
// import { useState } from "react";
// import { Heart, MessageCircle, Clock, Send, User } from "lucide-react";
// import CommentsSection from "../comment/comment";

// export default function PostCard({
//   id,
//   title,
//   codeSnippet,
//   createdAt,
//   language,
//   likes,
//   share,
//   ownerName,
//   description,
//   tags = [],
// }) {
//   const [showComments, setShowComments] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [comments, setComments] = useState([
//     { pseudonym: "John", createdAt: new Date(), content: "Nice post!" },
//     { pseudonym: "Jane", createdAt: new Date(), content: "Looks great!" },
//   ]);
//   console.log(id, "getting id");
//   const getPostTimeAgo = (date) => {
//     const diff = Math.floor((new Date() - new Date(date)) / 1000 / 60);
//     return diff < 1 ? "just now" : `${diff} min ago`;
//   };

//   const handlePostComment = () => {
//     if (!newComment.trim()) return;
//     setComments([
//       ...comments,
//       { pseudonym: "You", createdAt: new Date(), content: newComment },
//     ]);
//     setNewComment("");
//   };

//   return (
//     <div className="p-6 m-4 bg-[#0A0A0A] text-white border border-gray-700 rounded-lg space-y-4 shadow-md">
//       {/* Top Row */}
//       <div className="flex items-center space-x-3">
//         <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
//           <User className="w-6 h-6 text-gray-400" />
//         </div>
//         <div className="flex flex-col">
//           <p className="text-sm font-semibold">{title}</p>
//           <div className="flex items-center text-xs space-x-1">
//             <Clock className="w-3 h-3" />
//             <span>{getPostTimeAgo(createdAt)}</span>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="space-y-2">
//         <p className="text-sm text-white">{description}</p>
//         {codeSnippet && (
//           <pre className="bg-[#262626] p-2 rounded text-xs overflow-x-auto">
//             {codeSnippet}
//           </pre>
//         )}
//         <div className="flex gap-2 flex-wrap">
//           {tags.map((tag, idx) => (
//             <span
//               key={idx}
//               className="bg-[#262626] px-2 pb-1 text-xs rounded-md"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="flex items-center space-x-6 text-sm text-gray-400">
//         <div className="flex items-center space-x-1 cursor-pointer">
//           <Heart className="w-5 h-5" /> <span>{likes}</span>
//         </div>
//         <div
//           onClick={() => setShowComments(!showComments)}
//           className="flex items-center space-x-1 cursor-pointer"
//         >
//           <MessageCircle className="w-5 h-5" /> <span>{comments.length}</span>
//         </div>
//         <Send className="cursor-pointer w-5 h-5" />
//       </div>

//       {/* Comments */}
//       {showComments && <CommentsSection postId={id} />}
//     </div>
//   );
// }
import { useState } from "react";
import { Heart, MessageCircle, Clock, Send, User, Copy } from "lucide-react";
import CommentsSection from "../comment/comment";

export default function PostCard({
  id,
  title,
  codeSnippet,
  createdAt,
  language,
  likes,
  share,
  ownerName,
  comments,
  description,
  tags = [],
}) {
  const [showComments, setShowComments] = useState(false);

  // const [comments, setComments] = useState([]);
  const [copied, setCopied] = useState(false);

  const getPostTimeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffSeconds = Math.floor((now - postDate) / 1000);

    if (diffSeconds < 60) return "just now";
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 4)
      return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12)
      return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="p-6 m-4 bg-[#0A0A0A] text-white space-y-4 border border-gray-700 rounded-lg  shadow-md">
      {/* Top Row */}
      <div className="flex  items-center space-x-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-black" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{title}</p>
          <div className="flex items-center text-xs space-x-1">
            <Clock className="w-3 h-3" />
            <span>{getPostTimeAgo(createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        <p className="text-sm text-white">{description}</p>

        {codeSnippet && (
          <div className="relative bg-[#262626] rounded-lg overflow-hidden">
            {/* Header with language and copy button */}
            <div className="flex justify-between items-center px-3 py-1 bg-[#1f1f1f] border-b border-gray-700">
              <span className="text-xs font-semibold ">
                {language ? language.toUpperCase() : "CODE"}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-1 bg-gray-700 rounded hover:bg-gray-600"
                title="Copy code"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {/* Code block */}
            <pre className="p-3 text-xs overflow-x-auto">{codeSnippet}</pre>
            {/* Copied confirmation */}
            {copied && (
              <span className="absolute top-2 right-10 text-green-400 text-xs">
                Copied!
              </span>
            )}
          </div>
        )}

        <div className="flex gap-2  flex-wrap">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-[#262626] px-2 pb-1 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center space-x-6 text-sm ">
        <div className="flex items-center space-x-1 cursor-pointer">
          <Heart className="w-5 h-5" /> <span>{likes}</span>
        </div>
        <div
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5" /> <span>{comments.length}</span>
        </div>
        <Send className="cursor-pointer w-5 h-5" />
      </div>

      {/* Comments */}
      {showComments && <CommentsSection postId={id} />}
    </div>
  );
}
