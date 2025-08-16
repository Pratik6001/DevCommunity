import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
