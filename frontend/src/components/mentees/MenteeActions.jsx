import React from "react";

const MenteeActions = ({ mentee }) => {
  return (
    <div className="flex gap-2">
      <button className="text-blue-500 hover:underline">Edit</button>
      <button className="text-red-500 hover:underline">Delete</button>
    </div>
  );
};

export default MenteeActions;
