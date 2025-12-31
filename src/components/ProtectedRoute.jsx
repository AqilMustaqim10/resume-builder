// ProtectedRoute.jsx
// Blocks access to routes if user is not authenticated

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // While checking auth state
  if (loading) {
    return <p>Loading...</p>;
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, allow access
  return children;
}

export default ProtectedRoute;
