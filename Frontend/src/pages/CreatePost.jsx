// import { Code } from "lucide-react";
// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";

// const predefinedTags = [
//   "react",
//   "nodejs",
//   "javascript",
//   "typescript",
//   "python",
//   "java",
//   "css",
//   "html",
// ];

// export default function CreatePost() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [language, setLanguage] = useState("");
//   const [code, setCode] = useState("");
//   const [view, setView] = useState("write");
//   const [tags, setTags] = useState([]);
//   const [customTag, setCustomTag] = useState("");
//   const customInputRef = useRef();

//   const addTag = (t) => {
//     const tag = t.trim().toLowerCase();
//     if (!tag || tags.includes(tag) || tags.length >= 5) return;
//     setTags((s) => [...s, tag]);
//   };

//   const removeTag = (t) => setTags((s) => s.filter((x) => x !== t));

//   const handleCustomTagKey = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleAddCustomTag();
//     }
//   };

//   const handleAddCustomTag = () => {
//     if (!customTag.trim()) return;
//     addTag(customTag);
//     setCustomTag("");
//     customInputRef.current?.focus();
//   };

//   const handlePost = () => {
//     const payload = { title, description, codeSnippet: code, language, tags };
//     console.log("POST payload:", payload);
//     alert("Post data logged to console (replace with API call).");
//   };

//   useEffect(() => {
//     if (code.length > 100000) {
//       setCode((c) => c.slice(0, 100000));
//     }
//   }, [code]);

//   return (
//     <div className="min-h-screen m-4">
//       <div className="">
//         <div className="border rounded-xl border-[#1f1f1f] p-4 bg-gradient-to-b from-[#0b0b0b] to-[#080808] shadow-[0_6px_18px_rgba(0,0,0,0.6)]">
//           {/* Header */}
//           <div className="flex items-center gap-3 mb-5">
//             <div className="flex items-center gap-2">
//               <Code className="text-white" size={18} />

//               <h2 className="text-gray-100 text-lg font-semibold">
//                 Create New Post
//               </h2>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className="text-sm text-gray-300 mb-2 block">Title</label>
//               <input
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="What's your question or topic?"
//                 className="w-full rounded-md bg-[#0f0f0f] border border-[#262626] px-4 py-2 text-gray-100 placeholder:text-[#838383] outline-none focus:ring-0 focus:border-[#3b82f6]"
//               />
//             </div>

//             {/* Description */}
//             <div>
//               <label className="text-sm text-gray-300 mb-2 block">
//                 Description
//               </label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows={3} // ↓ reduced
//                 placeholder="Provide details about your question, problem, or topic..."
//                 className="w-full rounded-md bg-[#0f0f0f] border border-[#262626] px-4 py-2 text-gray-100 placeholder:text-[#838383] outline-none focus:ring-0 focus:border-[#3b82f6] resize-none"
//               />
//             </div>

//             {/* Code Snippet */}
//             <div>
//               <label className="text-sm text-gray-300 mb-3 block">
//                 Code Snippet (Optional)
//               </label>
//               <div className="flex items-center justify-between bg-transparent mb-3">
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setView("write")}
//                     className={`px-4 py-1 rounded-md text-sm ${
//                       view === "write"
//                         ? "bg-[#1f1f1f] border border-[#2d2d2d] text-gray-100"
//                         : "bg-transparent text-gray-400"
//                     }`}
//                   >
//                     Write
//                   </button>
//                   <button
//                     onClick={() => setView("preview")}
//                     className={`px-4 py-1 rounded-md text-sm ${
//                       view === "preview"
//                         ? "bg-[#1f1f1f] border border-[#2d2d2d] text-gray-100"
//                         : "bg-transparent text-gray-400"
//                     }`}
//                   >
//                     Preview
//                   </button>
//                 </div>
//                 <select
//                   value={language}
//                   onChange={(e) => setLanguage(e.target.value)}
//                   className="bg-[#0f0f0f] border border-[#262626] text-gray-200 px-3 py-1 rounded-md text-sm focus:outline-none"
//                 >
//                   <option value="">Select programming language</option>
//                   <option value="javascript">javascript</option>
//                   <option value="typescript">typescript</option>
//                   <option value="python">python</option>
//                   <option value="java">java</option>
//                   <option value="c++">c++</option>
//                   <option value="go">go</option>
//                   <option value="ruby">ruby</option>
//                 </select>
//               </div>
//               {view === "write" ? (
//                 <textarea
//                   value={code}
//                   onChange={(e) => setCode(e.target.value)}
//                   placeholder="Paste your code here..."
//                   rows={5} // ↓ reduced
//                   className="w-full rounded-md bg-[#0b0b0b] border border-[#222] px-4 py-2 text-sm text-gray-100 placeholder:text-[#838383] outline-none resize-none font-mono"
//                 />
//               ) : (
//                 <div className="w-full rounded-md bg-[#0b0b0b] border border-[#222] px-4 py-2 text-sm text-gray-100 font-mono min-h-[100px]">
//                   {code ? (
//                     <pre className="whitespace-pre-wrap">{code}</pre>
//                   ) : (
//                     <div className="text-[#838383]">// No code to preview</div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Tags */}
//             <div>
//               <label className="text-sm text-gray-300 mb-2 block">
//                 Tags (up to 5)
//               </label>
//               <div className="flex flex-wrap gap-2 mb-3">
//                 {tags.length === 0 && (
//                   <div className="text-[#838383] text-sm">No tags selected</div>
//                 )}
//                 {tags.map((t) => (
//                   <div
//                     key={t}
//                     className="flex items-center gap-2 bg-[#161616] border border-[#2a2a2a] text-gray-100 px-3 py-1 rounded-full text-sm"
//                   >
//                     <span>{t}</span>
//                     <button
//                       onClick={() => removeTag(t)}
//                       className="text-gray-400 hover:text-gray-200 text-xs"
//                       aria-label={`remove ${t}`}
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex flex-wrap gap-2 mb-3">
//                 {predefinedTags.map((t) => (
//                   <button
//                     key={t}
//                     onClick={() => addTag(t)}
//                     className={`px-3 py-1 rounded-md text-sm border ${
//                       tags.includes(t)
//                         ? "bg-[#262626] border-[#3a3a3a] text-gray-200"
//                         : "bg-transparent border-[#242424] text-gray-300 hover:bg-[#181818]"
//                     }`}
//                   >
//                     {t}
//                   </button>
//                 ))}
//               </div>
//               <div className="flex items-center gap-2">
//                 <input
//                   ref={customInputRef}
//                   value={customTag}
//                   onChange={(e) => setCustomTag(e.target.value)}
//                   onKeyDown={handleCustomTagKey}
//                   placeholder="Add custom tag..."
//                   className="flex-1 rounded-l-md bg-[#0f0f0f] border border-[#262626] px-3 py-2 text-gray-200 placeholder:text-[#838383] outline-none"
//                 />
//                 <button
//                   onClick={handleAddCustomTag}
//                   className="px-4 py-2 rounded-r-md bg-[#2b2b2b] border border-[#323232] text-gray-200"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex justify-end items-center gap-3 mt-2">
//               <Link
//                 to={"/"}
//                 onClick={() => {
//                   setTitle("");
//                   setDescription("");
//                   setCode("");
//                   setLanguage("");
//                   setTags([]);
//                   setCustomTag("");
//                 }}
//                 className="px-4 py-2 rounded-md bg-[#0e0e0e] border border-[#262626] text-gray-300 hover:bg-[#151515]"
//               >
//                 Cancel
//               </Link>
//               <button
//                 onClick={handlePost}
//                 className="px-5 py-2 rounded-md bg-gray-300 text-black font-medium hover:bg-gray-400"
//               >
//                 Post Question
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Code } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const predefinedTags = [
  "react",
  "nodejs",
  "javascript",
  "typescript",
  "python",
  "java",
  "css",
  "html",
];

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [view, setView] = useState("write");
  const [tags, setTags] = useState([]);
  const [customTag, setCustomTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const customInputRef = useRef();
  const navigate = useNavigate();

  const addTag = (t) => {
    const tag = t.trim().toLowerCase();
    if (!tag || tags.includes(tag) || tags.length >= 5) return;
    setTags((s) => [...s, tag]);
  };

  const removeTag = (t) => setTags((s) => s.filter((x) => x !== t));

  const handleCustomTagKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustomTag();
    }
  };

  const handleAddCustomTag = () => {
    if (!customTag.trim()) return;
    addTag(customTag);
    setCustomTag("");
    customInputRef.current?.focus();
  };

  const handlePost = async () => {
    if (!title || !description) {
      setError("Title and Description are required.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token"); // or get from Redux auth
      const payload = { title, description, codeSnippet: code, language, tags };

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/create-post`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Post created successfully!");
      setTitle("");
      setDescription("");
      setCode("");
      setLanguage("");
      setTags([]);
      setCustomTag("");

      // Redirect to home/feed after 1s
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code.length > 100000) setCode((c) => c.slice(0, 100000));
  }, [code]);

  return (
    <div className="min-h-screen m-4">
      <div className="border rounded-xl border-[#303030] p-4  shadow-[0_6px_18px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-2 mb-5">
          <Code className="text-white" size={18} />
          <h2 className="text-gray-100 text-lg font-semibold">
            Create New Post
          </h2>
        </div>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full rounded-md bg-[#0f0f0f] border border-[#646464] px-4 py-2 text-gray-100 placeholder:text-[#838383] outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="title">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Description"
              className="w-full rounded-md bg-[#0f0f0f] border border-[#646464]  px-4 py-2 text-gray-100 placeholder:text-[#838383] outline-none resize-none"
            />
          </div>

          {/* Code Snippet */}
          <div>
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => setView("write")}
                className={`px-4 py-1 rounded-md text-sm ${
                  view === "write"
                    ? "bg-[#1f1f1f] text-gray-100"
                    : "bg-transparent text-gray-400"
                }`}
              >
                Write
              </button>
              <button
                onClick={() => setView("preview")}
                className={`px-4 py-1 rounded-md text-sm ${
                  view === "preview"
                    ? "bg-[#1f1f1f] text-gray-100"
                    : "bg-transparent text-gray-400"
                }`}
              >
                Preview
              </button>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-[#0f0f0f] border border-[#646464]  text-gray-200 px-3 py-1 rounded-md text-sm"
              >
                <option value="">Select language</option>
                {[
                  "javascript",
                  "typescript",
                  "python",
                  "java",
                  "c++",
                  "go",
                  "ruby",
                ].map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            {view === "write" ? (
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                rows={5}
                className="w-full rounded-md bg-[#0b0b0b] border border-[#646464]  px-4 py-2 text-sm text-gray-100 placeholder:text-[#838383] outline-none resize-none font-mono"
              />
            ) : (
              <div className="w-full rounded-md bg-[#0b0b0b] border border-[#646464]  px-4 py-2 text-sm text-gray-100 font-mono min-h-[100px]">
                {code ? (
                  <pre className="whitespace-pre-wrap">{code}</pre>
                ) : (
                  <div className="text-[#838383]">// No code to preview</div>
                )}
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-2 bg-[#161616] border border-[#646464]  text-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  <span>{t}</span>
                  <button
                    onClick={() => removeTag(t)}
                    className="text-gray-400 hover:text-gray-200 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              {predefinedTags.map((t) => (
                <button
                  key={t}
                  onClick={() => addTag(t)}
                  className={`px-3 py-1 rounded-md text-sm border ${
                    tags.includes(t)
                      ? "bg-[#262626] text-gray-200"
                      : "bg-transparent text-gray-300 hover:bg-[#181818]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                ref={customInputRef}
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyDown={handleCustomTagKey}
                placeholder="Add custom tag..."
                className="flex-1 rounded-l-md bg-[#0f0f0f] border border-[#646464]  px-3 py-2 text-gray-200"
              />
              <button
                onClick={handleAddCustomTag}
                className="px-4 py-2 rounded-r-md bg-white border border-[#646464]  text-black"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end items-center gap-3 mt-2">
            <Link
              to="/"
              onClick={() => {
                setTitle("");
                setDescription("");
                setCode("");
                setLanguage("");
                setTags([]);
                setCustomTag("");
              }}
              className="px-4 py-2 rounded-md bg-[#0e0e0e] border border-[#646464]  text-gray-300 hover:bg-[#151515]"
            >
              Cancel
            </Link>
            <button
              onClick={handlePost}
              disabled={loading}
              className="px-5 py-2 rounded-md cursor-pointer bg-white text-black font-medium "
            >
              {loading ? "Posting..." : "Post Question"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
