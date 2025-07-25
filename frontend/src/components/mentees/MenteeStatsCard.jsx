import React from "react";
import { FaUsers, FaUserCheck, FaUserClock, FaUserPlus } from "react-icons/fa";

const MenteeStatsCard = ({ mentees }) => {
  const total = mentees.length;
  const active = mentees.filter((m) => m.status === "Active").length;
  const unassigned = mentees.filter((m) => m.status !== "Active").length;
  const recent = mentees.slice(-5).length;

  const stats = [
    {
      title: "Total Mentees",
      count: total,
      icon: <FaUsers className="text-blue-600 text-2xl" />,
    },
    {
      title: "Active Mentees",
      count: active,
      icon: <FaUserCheck className="text-green-600 text-2xl" />,
    },
    {
      title: "Unassigned Mentees",
      count: unassigned,
      icon: <FaUserClock className="text-yellow-600 text-2xl" />,
    },
    {
      title: "Recently Added",
      count: recent,
      icon: <FaUserPlus className="text-purple-600 text-2xl" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white shadow rounded-xl p-4 flex items-center gap-4"
        >
          <div className="bg-gray-100 p-3 rounded-full">{stat.icon}</div>
          <div>
            <p className="text-gray-600 text-sm">{stat.title}</p>
            <p className="text-xl font-bold">{stat.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenteeStatsCard;

