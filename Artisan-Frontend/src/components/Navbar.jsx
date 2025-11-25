import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Artisan’s Corner
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-4">

        {/* Cart is visible to EVERYONE */}
        <Link to="/cart" className="text-gray-700 hover:text-black">
          Cart
        </Link>

        {/* If NO user */}
        {!user && (
          <>
            <Link to="/login" className="text-gray-700 hover:text-black">
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Register
            </Link>
          </>
        )}

        {/* If user IS logged in */}
        {user && (
          <>
            {/* Common for all users */}
            <Link to="/" className="text-gray-700 hover:text-black">
              Home
            </Link>

            {/* Customer */}
            {user.role === "customer" && (
              <Link to="/my-orders" className="text-gray-700 hover:text-black">
                My Orders
              </Link>
            )}

            {/* Vendor */}
            {user.role === "vendor" && (
              <Link to="/vendor/dashboard" className="text-gray-700 hover:text-black">
                Dashboard
              </Link>
            )}

            {/* Admin */}
            {user.role === "admin" && (
              <Link to="/admin" className="text-gray-700 hover:text-black">
                Admin Panel
              </Link>
            )}

            {/* Logout */}
            <button
              onClick={logout}
              className="ml-3 px-3 py-1 bg-red-600 text-white rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
