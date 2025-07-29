import React, { useEffect, useState } from "react";
import api from "../../api";
import { FaSave, FaLock, FaBell, FaMoon } from "react-icons/fa";

const Settings = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ current: "", new: "" });
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("light");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Fetch admin profile and settings
    const fetchData = async () => {
      try {
        const profileRes = await api.get("/admin/profile");
        setForm({ name: profileRes.data.name, email: profileRes.data.email });

        const settingsRes = await api.get("/admin/settings");
        setNotifications(settingsRes.data.notifications);
        setTheme(settingsRes.data.theme);
      } catch (err) {
        console.error("Failed to fetch settings", err);
      }
    };

    fetchData();
  }, []);

  const handleProfileChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/admin/profile", form);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setMessage("Error updating profile.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/admin/change-password", passwordForm);
      setMessage("Password changed successfully.");
      setPasswordForm({ current: "", new: "" });
    } catch (err) {
      setMessage("Error changing password.");
    }
  };

  const handleSettingsChange = async () => {
    try {
      await api.put("/admin/settings", { notifications, theme });
      setMessage("Settings updated.");
    } catch (err) {
      setMessage("Failed to update settings.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>

      {message && <div className="mb-4 text-green-600 font-medium">{message}</div>}

      {/* Profile Update */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleProfileChange}
            placeholder="Name"
            className="w-full border px-4 py-3 rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleProfileChange}
            placeholder="Email"
            className="w-full border px-4 py-3 rounded-lg"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
            <FaSave /> Save Changes
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <input
            type="password"
            name="current"
            value={passwordForm.current}
            onChange={handlePasswordChange}
            placeholder="Current Password"
            className="w-full border px-4 py-3 rounded-lg"
            required
          />
          <input
            type="password"
            name="new"
            value={passwordForm.new}
            onChange={handlePasswordChange}
            placeholder="New Password"
            className="w-full border px-4 py-3 rounded-lg"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
            <FaLock /> Update Password
          </button>
        </form>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Preferences</h2>
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <FaBell /> Enable Notifications
          </label>
          <label className="flex items-center gap-2">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="light">Light Theme</option>
              <option value="dark">Dark Theme</option>
            </select>
            <FaMoon /> Theme
          </label>
        </div>
        <button
          onClick={handleSettingsChange}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default Settings;
