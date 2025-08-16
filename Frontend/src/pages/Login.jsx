// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, signupUser } from "../redux/store/authSlice";

// export default function Auth() {
//   const dispatch = useDispatch();
//   const {
//     user: reduxUser,
//     token,
//     redirectUrl,
//     loading,
//     error,
//   } = useSelector((state) => state.auth);

//   const [currentPage, setCurrentPage] = useState("login"); // login or signup
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "user",
//   });
//   const [message, setMessage] = useState("");

//   const roles = ["admin", "user"];

//   // Auto-set context user if Redux user exists
//   useEffect(() => {
//     if (reduxUser) {
//       localStorage.setItem("token", token);
//       window.location.href = redirectUrl || "/";
//     }
//   }, [reduxUser, token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     dispatch(
//       signupUser({
//         name: form.name,
//         email: form.email,
//         password: form.password,
//         role: form.role,
//       })
//     );
//     setCurrentPage("login");
//     setForm({ name: "", email: "", password: "", role: "user" });
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setMessage("");
//     dispatch(loginUser({ email: form.email, password: form.password }));
//   };

//   // const handleLogout = () => {

//   //   setForm({ name: "", email: "", password: "", role: "user" });
//   //   setCurrentPage("login");
//   //   setMessage("You have been logged out.");
//   // };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-4 font-inter">
//       <div className="w-full max-w-md">
//         {/* LOGIN FORM */}
//         {currentPage === "login" && (
//           <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
//             <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
//               Login
//             </h1>
//             <p className="text-center text-gray-600 mb-6">
//               Welcome! Please log in to continue.
//             </p>
//             <form onSubmit={handleLogin} className="space-y-5">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-blue-600"
//                 disabled={loading}
//               >
//                 {loading ? "Logging In..." : "Login"}
//               </button>
//             </form>
//             {(message || error) && (
//               <p
//                 className={`mt-4 text-center text-sm font-medium ${
//                   message.includes("success")
//                     ? "text-green-600"
//                     : "text-red-600"
//                 }`}
//               >
//                 {message || error}
//               </p>
//             )}
//             <p className="mt-6 text-center text-gray-600 text-sm">
//               Don't have an account?{" "}
//               <button
//                 onClick={() => setCurrentPage("signup")}
//                 className="text-indigo-600 hover:underline font-medium"
//               >
//                 Sign Up
//               </button>
//             </p>
//           </div>
//         )}

//         {/* SIGNUP FORM */}
//         {currentPage === "signup" && (
//           <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
//             <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
//               Register Account
//             </h1>
//             <form onSubmit={handleSignup} className="space-y-5">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
//                 value={form.name}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//               />
//               <select
//                 name="role"
//                 value={form.role}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
//               >
//                 <option value="">Select role</option>
//                 {roles.map((r) => (
//                   <option key={r} value={r}>
//                     {r.charAt(0).toUpperCase() + r.slice(1)}
//                   </option>
//                 ))}
//               </select>
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 rounded-lg hover:from-green-700 hover:to-emerald-600"
//                 disabled={loading}
//               >
//                 {loading ? "Signing Up..." : "Sign Up"}
//               </button>
//             </form>
//             {message && (
//               <p
//                 className={`mt-4 text-center text-sm font-medium ${
//                   message.includes("success")
//                     ? "text-green-600"
//                     : "text-red-600"
//                 }`}
//               >
//                 {message}
//               </p>
//             )}
//             <p className="mt-6 text-center text-gray-600 text-sm">
//               Already have an account?{" "}
//               <button
//                 onClick={() => setCurrentPage("login")}
//                 className="text-green-600 hover:underline font-medium"
//               >
//                 Login
//               </button>
//             </p>
//           </div>
//         )}

//         {/* DASHBOARD */}
//         {/* {reduxUser && currentPage === "login" && (
//           <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center max-w-2xl mx-auto">
//             <h2 className="text-4xl font-bold mb-4 text-gray-900">
//               Welcome, {reduxUser.username}!
//             </h2>
//             <button
//               onClick={handleLogout}
//               className="bg-gradient-to-r from-red-600 to-rose-500 text-white py-3 px-6 rounded-lg hover:from-red-700 hover:to-rose-600"
//             >
//               Logout
//             </button>
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  signupUser,
  sendResetEmail,
  clearMessages,
} from "../redux/store/authSlice";

export default function Auth() {
  const dispatch = useDispatch();
  const {
    user: reduxUser,
    token,
    redirectUrl,
    loading,
    error,
    message,
    resetEmailStatus,
  } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState("login"); // login, signup, forgot-password
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const roles = ["admin", "user"];

  // Auto-set context user if Redux user exists
  useEffect(() => {
    if (reduxUser) {
      localStorage.setItem("token", token);
      window.location.href = redirectUrl || "/";
    }
    return () => {
      dispatch(clearMessages());
    };
  }, [reduxUser, token, redirectUrl, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(
      signupUser({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      })
    );
    setCurrentPage("login");
    setForm({ name: "", email: "", password: "", role: "user" });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email: form.email, password: form.password }));
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(sendResetEmail(form.email));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md">
        {/* LOGIN FORM */}
        {currentPage === "login" && (
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
            <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
              Login
            </h1>
            <p className="text-center text-gray-600 mb-6">
              Welcome! Please log in to continue.
            </p>
            <form onSubmit={handleLogin} className="space-y-5">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-blue-600"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Login"}
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
              Don't have an account?{" "}
              <button
                onClick={() => setCurrentPage("signup")}
                className="text-indigo-600 hover:underline font-medium"
              >
                Sign Up
              </button>
            </p>
            <p className="mt-2 text-center text-gray-600 text-sm">
              Forgot your password?{" "}
              <button
                onClick={() => setCurrentPage("forgot-password")}
                className="text-indigo-600 hover:underline font-medium"
              >
                Reset Password
              </button>
            </p>
          </div>
        )}

        {/* SIGNUP FORM */}
        {currentPage === "signup" && (
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
              Register Account
            </h1>
            <form onSubmit={handleSignup} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={form.password}
                onChange={handleChange}
                required
              />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select role</option>
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 rounded-lg hover:from-green-700 hover:to-emerald-600"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
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
              Already have an account?{" "}
              <button
                onClick={() => setCurrentPage("login")}
                className="text-green-600 hover:underline font-medium"
              >
                Login
              </button>
            </p>
          </div>
        )}

        {/* FORGOT PASSWORD FORM */}
        {currentPage === "forgot-password" && (
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
            <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
              Forgot Password
            </h1>
            <p className="text-center text-gray-600 mb-6">
              Enter your email to receive a password reset link.
            </p>
            <form onSubmit={handleForgotPassword} className="space-y-5">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={form.email}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-blue-600"
                disabled={resetEmailStatus === "loading"}
              >
                {resetEmailStatus === "loading"
                  ? "Sending..."
                  : "Send Reset Email"}
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
                onClick={() => setCurrentPage("login")}
                className="text-indigo-600 hover:underline font-medium"
              >
                Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
