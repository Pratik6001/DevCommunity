// import React, { useState, useEffect } from "react";
// import { RefreshCw, Plus } from "lucide-react";
// import { Link } from "react-router-dom";
// import PostCard from "./cards/Card";
// import CompleteProfileCard from "./createprofile/CreateProfile";
// import NavBar2 from "./Navbar2";
// import Chat from "./chat/Chat";
// import Bookmark from "./bookmark/Bookmark";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchFeedData } from "../redux/store/feedSlice";

// export default function Home() {
//   const dispatch = useDispatch();

//   const { user, token } = useSelector((state) => state.auth);
//   if (!user) return <p>Please login to see your dashboard.</p>;

//   const { data, loading, error } = useSelector((state) => state?.feed);
//   const [query, setQuery] = useState("");

//   const [activeTab, setActiveTab] = useState("Feed");

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleSearch = () => {
//     dispatch(fetchFeedData({ query }));
//   };
//   const handleTrending = () => {
//     dispatch(fetchFeedData({ query: "" }));
//   };

//   useEffect(() => {
//     dispatch(fetchFeedData({ query: "python" }));
//   }, [dispatch]);

//   console.log(data, "getting by the api");
//   return (
//     <div className="">
//       <NavBar2 handleTabChange={handleTabChange} />
//       <CompleteProfileCard />

//       {activeTab === "Feed" && (
//         <>
//           <div className="flex justify-between m-6">
//             <h1 className="text-2xl font-bold text-white">Community Feed</h1>
//             <div className="flex gap-2">
//               <button className="flex items-center gap-2 cursor-pointer bg-black border border-[#585858] text-white rounded px-4 py-2">
//                 <RefreshCw size={16} />
//                 Refresh
//               </button>
//               <Link
//                 to={"/create-post"}
//                 className="flex items-center gap-2 bg-white text-black rounded px-4 py-2 cursor-pointer"
//               >
//                 <Plus size={16} />
//                 New Post
//               </Link>
//             </div>
//           </div>
//           {data?.data?.map((post) => (
//             <PostCard
//               key={post.id}
//               ownerLogin={post.owner_login}
//               name={post.name}
//               description={post.description}
//               primaryCategory={post.primary_category}
//               secondaryCategory={post.secondary_category}
//               stars={post.stars}
//               iconSvg={post.icon_svg}
//             />
//           ))}
//         </>
//       )}

//       {activeTab === "Chat" && <Chat />}
//       {activeTab === "Bookmarks" && <Bookmark />}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { RefreshCw, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import PostCard from "./cards/Card";
import CompleteProfileCard from "./createprofile/CreateProfile";
import NavBar2 from "./Navbar2";
import Chat from "./chat/Chat";
import Bookmark from "./bookmark/Bookmark";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeedData } from "../redux/store/feedSlice";
import axios from "axios";

export default function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // if (!user) return <p>Please login to see your dashboard.</p>;

  const { data, loading, error } = useSelector((state) => state?.feed);
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1); // Add pageNumber state
  const [maxPage] = useState(2); // Keep maxPage fixed or make dynamic if needed
  const [activeTab, setActiveTab] = useState("Feed");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = () => {
    setPageNumber(1); // Reset to page 1 on new search
    dispatch(fetchFeedData({ query, pageNumber: 1, maxPage }));
  };

  const handleTrending = () => {
    setPageNumber(1); // Reset to page 1 for trending
    dispatch(fetchFeedData({ query: "", pageNumber: 1, maxPage }));
  };

  const handleNextPage = () => {
    setPageNumber((prev) => prev + 1); // Increment pageNumber
  };

  const handlePreviousPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1)); // Decrement but not below 1
  };

  useEffect(() => {
    dispatch(fetchFeedData({ query: "python", pageNumber, maxPage }));
  }, [dispatch, pageNumber]); // Add pageNumber to dependencies

  const [seconddata, setdata] = useState([]);
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/get-all-data`
        );
        setdata(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeed();
  }, []);

  return (
    <div className="">
      <NavBar2 handleTabChange={handleTabChange} />
      {!user?.profileComplete && <CompleteProfileCard />}

      {activeTab === "Feed" && (
        <>
          <div className="flex justify-between m-6">
            <h1 className="text-2xl font-bold text-white">Community Feed</h1>
            <div className="flex gap-2">
              <button
                className="flex items-center gap-2 cursor-pointer bg-black border border-[#585858] text-white rounded px-4 py-2"
                onClick={handleTrending}
              >
                <RefreshCw size={16} />
                Refresh
              </button>
              <Link
                to={"/create-post"}
                className="flex items-center gap-2 bg-white text-black rounded px-4 py-2 cursor-pointer"
              >
                <Plus size={16} />
                New Post
              </Link>
            </div>
          </div>

          {/* Search Input */}
          <div className="m-4  flex flex-col sm:flex-row w-full max-w-xl mx-auto gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 rounded-r-md bg-blue-500 hover:bg-blue-600 text-white font-medium transition"
            >
              Search
            </button>
          </div>

          {/* Loading and Error States */}
          {loading && <p className="text-white">Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {/* Post List */}
          {/* {data?.data?.length > 0 ? (
            data.data.map((post) => (
              <PostCard
                key={post.id}
                ownerLogin={post.owner_login}
                name={post.name}
                description={post.description}
                primaryCategory={post.primary_category}
                secondaryCategory={post.secondary_category}
                stars={post.stars}
                iconSvg={post.icon_svg}
              />
            ))
          ) : (
            <p className="text-white">No posts found.</p>
          )} */}
          {seconddata?.length > 0 ? (
            seconddata.map((post, idx) => (
              <PostCard
                key={idx}
                id={post._id}
                title={post.title}
                codeSnippet={post.codeSnippet}
                createdAt={post.createdAt}
                comments={post.comments}
                language={post.language}
                likes={post.likes.length}
                share={post.shares.length}
                ownerName={post.owner} // if populated
                description={post.description}
                tags={post.tags}
              />
            ))
          ) : (
            <p className="text-white">No posts found.</p>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center gap-4 m-6">
            <button
              onClick={handlePreviousPage}
              disabled={pageNumber === 1}
              className="bg-gray-500 text-white rounded px-4 py-2 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-white">Page {pageNumber}</span>
            <button
              onClick={handleNextPage}
              disabled={pageNumber >= maxPage} // Disable if maxPage reached
              className="bg-blue-500 text-white rounded px-4 py-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {activeTab === "Chat" &&
        (user ? (
          <Chat />
        ) : (
          <div className="text-center p-4">
            <p>You need to login to access this tab.</p>
          </div>
        ))}

      {activeTab === "Bookmarks" &&
        (user ? (
          <Bookmark />
        ) : (
          <div className="text-center p-4">
            <p>You need to login to access this tab.</p>
          </div>
        ))}
    </div>
  );
}
