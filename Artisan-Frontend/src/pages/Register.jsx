import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { themeClasses } from "../utils/theme";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
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
      const res = await api.post("/auth/register", form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container py-16 flex justify-center">
      <div className={`${themeClasses.card} w-full max-w-md`}>
        <h2 className={`text-3xl font-bold mb-6 ${themeClasses.textPrimary}`}>Create Account</h2>

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className={themeClasses.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
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

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className={themeClasses.input}
          >
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
          </select>

          <button
            type="submit"
            className={`${themeClasses.buttonPrimary} w-full mt-2`}
          >
            Register
          </button>
        </form>

        <p className={`text-center mt-4 ${themeClasses.textSecondary}`}>
          Already have an account? <a href="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">Login here</a>
        </p>
      </div>
    </div>
  );
}
