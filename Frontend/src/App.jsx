import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import HomeLayout from "./layout/HomeLayout";
import CreateProfile from "./components/steps/completeProfile";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/create-profile"
            element={
              <ProtectedRoute allowedRoles={["user"]} redirectTo="/">
                <CreateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute allowedRoles={["user"]} redirectTo="/">
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
