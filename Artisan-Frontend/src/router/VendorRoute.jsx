import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function VendorRoute({ children }) {
  const { user } = useAuth();

  // If no user → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is NOT a vendor → redirect to home
  if (user.role !== "vendor") {
    return <Navigate to="/" replace />;
  }

  return children;
}
