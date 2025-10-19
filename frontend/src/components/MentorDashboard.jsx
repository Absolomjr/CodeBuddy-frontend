import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import api from "../api";

const MentorDashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toggleRecent, setToggleRecent] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/mentors/requests");
        setRequests(res.data);
        console.log(res.data)
      } catch (err) {
        setError("Failed to load requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [toggleRecent]);

  const handleDecision = async (requestId, action) => {
    try {
      await api.patch(`/mentors/requests/${requestId}`, { action });
      setRequests((prev) => prev.filter((req) => req.request_id !== requestId));
      setToggleRecent(!recentRequests);
    } catch {
      alert("Failed to update request");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const recentRequests = requests.filter((r) => r.status !== "pending");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col">
      {/*  The Top bar */}
      <div className="flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-700">
          Mentor Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-semibold text-gray-700">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
          <img
            src={`https://ui-avatars.com/api/?name=${user.name.replace(
              " ",
              "+"
            )}&background=4f8cff&color=fff`}
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-blue-400"
          />
          <button
            onClick={handleLogout}
            className="ml-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* The main content */}
      <div className="flex-1 p-6 flex flex-col md:flex-row max-w-6xl mx-auto w-full">
        {/*  The recent activities Sidebar */}
        <div className="md:w-1/3 md:mr-8 mb-8 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentRequests.length === 0 ? (
              <div className="text-gray-500">No recent activities.</div>
            ) : (
              recentRequests.map((mentee) => (
                <div
                  key={mentee.request_id}
                  className="bg-white rounded-lg shadow p-4"
                >
                  <div className="font-bold text-blue-700">{mentee.name}</div>
                  <div className="text-sm text-gray-500">{mentee.degree}</div>
                  <div className="text-sm text-gray-400">{mentee.email}</div>
                  <div className="mt-2 text-gray-700">{mentee.description}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {mentee.created_at
                      ? new Date(mentee.created_at).toLocaleString()
                      : ""}
                  </div>
                  <div
                    className={`mt-2 font-semibold ${
                      mentee.status === "accepted"
                        ? "text-green-600"
                        : mentee.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {mentee.status.charAt(0).toUpperCase() +
                      mentee.status.slice(1)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* The Main content ... */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Mentee Requests
          </h2>
          {loading ? (
            <div>Loading requests...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : pendingRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pendingRequests.map((mentee) => (
                <div
                  key={mentee.request_id}
                  className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-400"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${mentee.name.replace(
                        " ",
                        "+"
                      )}&background=2563eb&color=fff`}
                      alt={mentee.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-bold text-lg text-blue-700">
                        {mentee.name}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {mentee.degree}
                      </div>
                      <div className="text-sm text-gray-400">
                        {mentee.email}
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Request:</span>{" "}
                    {mentee.description}
                  </div>
                  <div className="flex gap-4 mt-4 items-center">
                    <button
                      onClick={() =>
                        handleDecision(mentee.request_id, "accepted")
                      }
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleDecision(mentee.request_id, "rejected")
                      }
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
                    >
                      Reject
                    </button>
                    <span className={`ml-4 font-semibold text-yellow-600`}>
                      Pending
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">
              No mentee requests at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
