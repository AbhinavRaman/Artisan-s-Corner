import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { themeClasses } from "../utils/theme";

export default function Profile() {
  const { user, setUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  // Load current profile data
  const loadProfile = async () => {
    try {
      const res = await api.get("/user/me");
      setForm({
        name: res.data.name,
        email: res.data.email,
      });
    } catch (err) {
      console.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // Update profile info (name/email)
  const updateProfile = async () => {
    try {
      const res = await api.put("/user/me", form);
      setUser(res.data);
      alert("Profile updated!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading)
    return (
      <div className={`text-center py-10 ${themeClasses.textSecondary}`}>
        Loading profile...
      </div>
    );

  return (
    <div className="container py-10 max-w-2xl">
      <h1 className={`text-4xl font-bold mb-8 ${themeClasses.textPrimary}`}>My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Section */}
        <div className={themeClasses.card}>
          <h2 className={`text-2xl font-bold mb-6 ${themeClasses.textPrimary}`}>
            Personal Information
          </h2>

          <div className="grid gap-4">
            <div>
              <label className={`block ${themeClasses.textSecondary} mb-2 font-medium`}>
                Full Name
              </label>
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={themeClasses.input}
              />
            </div>

            <div>
              <label className={`block ${themeClasses.textSecondary} mb-2 font-medium`}>
                Email Address
              </label>
              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={themeClasses.input}
              />
            </div>

            <button
              onClick={updateProfile}
              className={`${themeClasses.buttonPrimary} w-full mt-4`}
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Password Change Section */}
        <ChangePasswordSection />
      </div>
    </div>
  );
}

function ChangePasswordSection() {
  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const updatePassword = async () => {
    try {
      await api.put("/user/change-password", pwForm);
      alert("Password updated!");
      setPwForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className={themeClasses.card}>
      <h2 className={`text-2xl font-bold mb-6 ${themeClasses.textPrimary}`}>Change Password</h2>

      <div className="grid gap-4">
        <div>
          <label className={`block ${themeClasses.textSecondary} mb-2 font-medium`}>
            Current Password
          </label>
          <input
            type="password"
            placeholder="Current Password"
            value={pwForm.currentPassword}
            onChange={(e) =>
              setPwForm({ ...pwForm, currentPassword: e.target.value })
            }
            className={themeClasses.input}
          />
        </div>

        <div>
          <label className={`block ${themeClasses.textSecondary} mb-2 font-medium`}>
            New Password
          </label>
          <input
            type="password"
            placeholder="New Password"
            value={pwForm.newPassword}
            onChange={(e) =>
              setPwForm({ ...pwForm, newPassword: e.target.value })
            }
            className={themeClasses.input}
          />
        </div>

        <button
          onClick={updatePassword}
          className={`${themeClasses.buttonSuccess} w-full mt-4`}
        >
          Update Password
        </button>
      </div>
    </div>
  );
}

