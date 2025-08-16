import { Bell, ChevronDown, Code2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/store/authSlice";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Access user from Redux state
  const { user, token } = useSelector((state) => state.auth);
  const isAuthenticated = !!token;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-black border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-2">
        <Code2 size={24} className="text-white" />
        <span className="text-white font-semibold text-lg">DevCommunity</span>
      </Link>
      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <button className="text-gray-300 hover:text-white">
            <Bell className="text-green-500" size={20} />
          </button>
        )}

        {/* User Menu */}
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-1 focus:outline-none"
            >
              <img
                src="https://github.com/shadcn.png"
                alt={user?.username || "User Avatar"}
                className="w-8 h-8 rounded-full border border-gray-600"
              />
              {user.username}
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black text-white border border-gray-700 rounded-lg shadow-lg z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-800"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm hover:bg-gray-800"
                  onClick={() => setDropdownOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-800"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
