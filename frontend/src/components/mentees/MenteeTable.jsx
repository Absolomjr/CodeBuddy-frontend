import React from "react";
import MenteeActions from "./MenteeActions";

const MenteeTable = ({ mentees }) => {
  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {mentees.map((mentee) => (
            <tr key={mentee.id}>
              <td className="px-4 py-2 whitespace-nowrap">{mentee.name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{mentee.email}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <MenteeActions mentee={mentee} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenteeTable;
