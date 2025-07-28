import React from "react";

const MenteeSearchFilter = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Search mentees by name..."
        className="border p-2 rounded w-full"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {/* Optional: Keep this for future year filter */}
      {/* <select className="border p-2 rounded">
        <option value="">All Years</option>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
      </select> */}
    </div>
  );
};

export default MenteeSearchFilter;

