import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { themeClasses } from "../utils/theme";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container py-16 flex justify-center">
      <div className={`${themeClasses.card} w-full max-w-md`}>
        <h2 className={`text-3xl font-bold mb-6 ${themeClasses.textPrimary}`}>Login</h2>

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className={themeClasses.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className={themeClasses.input}
          />

          <button
            type="submit"
            className={`${themeClasses.buttonPrimary} w-full mt-2`}
          >
            Login
          </button>
        </form>

        <p className={`text-center mt-4 ${themeClasses.textSecondary}`}>
          Don't have an account? <a href="/register" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">Register here</a>
        </p>
      </div>
    </div>
  );
}
