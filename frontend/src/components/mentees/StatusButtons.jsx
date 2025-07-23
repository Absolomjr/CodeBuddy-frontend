import React from "react";

const StatusButtons = ({ mentee, onStatusChange }) => {
  const statuses = ["Active", "Inactive", "Pending"];

  return (
    <div className="flex space-x-2">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(mentee.id, status)}
          className={`text-xs px-2 py-1 rounded font-medium border ${
            mentee.status === status
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default StatusButtons;
