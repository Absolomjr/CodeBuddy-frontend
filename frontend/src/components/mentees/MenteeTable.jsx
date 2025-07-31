import React from "react";
import MenteeActions from "./MenteeActions";

const MenteeTable = ({ mentees, onEdit, onDelete, loadingMenteeId }) => {
  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Degree</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {mentees.map((mentee) => (
            <tr key={mentee._id}>
              <td className="px-4 py-2">{mentee.name}</td>
              <td className="px-4 py-2">{mentee.email}</td>
              <td className="px-4 py-2">{mentee.degree || "N/A"}</td>
              <td className="px-4 py-2">
                <MenteeActions
                  mentee={mentee}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  loadingMenteeId={loadingMenteeId}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenteeTable;