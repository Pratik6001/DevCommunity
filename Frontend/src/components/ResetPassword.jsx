import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword, clearMessages } from "../redux/store/authSlice";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetPasswordStatus, error, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, newPassword }));
  };

  useEffect(() => {
    if (resetPasswordStatus === "succeeded") {
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect to login after 2 seconds
    }
    return () => {
      dispatch(clearMessages());
    };
  }, [resetPasswordStatus, navigate, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
            Reset Password
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Enter your new password below.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="password"
              id="newPassword"
              placeholder="New Password"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-blue-600"
              disabled={resetPasswordStatus === "loading"}
            >
              {resetPasswordStatus === "loading"
                ? "Resetting..."
                : "Reset Password"}
            </button>
          </form>
          {(message || error) && (
            <p
              className={`mt-4 text-center text-sm font-medium ${
                message && message.includes("success")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message || error}
            </p>
          )}
          <p className="mt-6 text-center text-gray-600 text-sm">
            Back to{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-indigo-600 hover:underline font-medium"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
