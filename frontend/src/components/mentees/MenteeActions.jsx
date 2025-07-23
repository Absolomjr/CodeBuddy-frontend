import React from "react";

const MenteeActions = ({ mentee }) => {
  const handleView = () => alert(`Viewing ${mentee.name}`);
  const handleEdit = () => alert(`Editing ${mentee.name}`);
  const handleDelete = () => alert(`Deleting ${mentee.name}`);

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleView}
        className="text-blue-600 hover:underline text-sm"
      >
        View
      </button>
      <button
        onClick={handleEdit}
        className="text-yellow-600 hover:underline text-sm"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="text-red-600 hover:underline text-sm"
      >
        Delete
      </button>
    </div>
  );
};

export default MenteeActions;
