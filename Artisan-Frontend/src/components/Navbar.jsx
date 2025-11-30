import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDarkMode } from "../context/DarkModeContext";
import { themeClasses } from "../utils/theme";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? `text-indigo-600 dark:text-indigo-400 font-semibold`
      : `${themeClasses.textSecondary}`;

  return (
    <nav className={`${themeClasses.bgPrimary} border-b ${themeClasses.borderLight} shadow-sm sticky top-0 z-50`}>
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight hover:opacity-90 transition`}
        >
          Artisan's Corner
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8 text-base">
          <Link to="/" className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition ${isActive("/")}`}>
            Home
          </Link>

          <Link to="/cart" className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition ${isActive("/cart")}`}>
            Cart
          </Link>

          {!user && (
            <>
              <Link to="/login" className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition ${isActive("/login")}`}>
                Login
              </Link>

              <Link
                to="/register"
                className={`${themeClasses.buttonPrimary} px-4 py-2 text-sm`}
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              {user.role === "customer" && (
                <Link to="/my-orders" className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition ${isActive("/my-orders")}`}>
                  My Orders
                </Link>
              )}

              {user.role === "vendor" && (
                <Link to="/vendor/dashboard" className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition ${isActive("/vendor/dashboard")}`}>
                  Dashboard
                </Link>
              )}

              {user.role === "admin" && (
                <Link to="/admin" className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition ${isActive("/admin")}`}>
                  Admin Panel
                </Link>
              )}

              <Link to="/profile" className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition ${isActive("/profile")}`}>
                Profile
              </Link>

              <button
                onClick={logout}
                className={`${themeClasses.buttonDanger} px-4 py-2 text-sm`}
              >
                Logout
              </button>
            </>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`${themeClasses.buttonSecondary} px-3 py-2 text-sm`}
            title="Toggle Dark Mode"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}
