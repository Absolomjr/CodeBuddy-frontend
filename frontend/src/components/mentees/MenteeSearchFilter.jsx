import React from "react";

const MenteeSearchFilter = () => {
  return (
    <div className="flex gap-4">
      <input type="text" placeholder="Search mentees..." className="border p-2 rounded w-full" />
      <select className="border p-2 rounded">
        <option value="">All Cohorts</option>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
      </select>
    </div>
  );
};

export default MenteeSearchFilter;
