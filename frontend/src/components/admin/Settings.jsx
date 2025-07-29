import React, { useEffect, useState } from "react";
import api from "../../api";
import { FaEdit, FaSave, FaLock } from "react-icons/fa";

const Settings = () => {
  const [admin, setAdmin] = useState({ name: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: "", new: "" });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/admin/profile");
        setAdmin({ name: res.data.name, email: res.data.email });
      } catch (err) {
        console.error("Error fetching settings", err);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async () => {
    try {
      await api.put("/admin/profile", admin);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await api.put("/admin/change-password", passwordForm);
      setPasswordForm({ current: "", new: "" });
    } catch (err) {
      console.error("Error changing password", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>

      {/* Admin Info */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        {!editMode ? (
          <div className="space-y-3">
            <div><strong>Name:</strong> {admin.name}</div>
            <div><strong>Email:</strong> {admin.email}</div>
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <FaEdit /> Edit Profile
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={admin.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-3 border rounded"
            />
            <input
              type="email"
              name="email"
              value={admin.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 border rounded"
            />
            <div className="flex gap-4">
              <button
                onClick={handleProfileUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
              >
                <FaSave /> Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Password Section */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <input
            type="password"
            name="current"
            value={passwordForm.current}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, current: e.target.value })
            }
            placeholder="Current Password"
            className="w-full px-4 py-3 border rounded"
            required
          />
          <input
            type="password"
            name="new"
            value={passwordForm.new}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, new: e.target.value })
            }
            placeholder="New Password"
            className="w-full px-4 py-3 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <FaLock /> Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
