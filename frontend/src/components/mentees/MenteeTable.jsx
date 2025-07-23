import React, { useState } from "react";
import MenteeActions from "./MenteeActions";
import StatusButtons from "./StatusButtons";

const MenteeTable = () => {
  const [mentees, setMentees] = useState([
    { id: 1, name: "Absolom Jr", email: "absolom@gmail.com", year: "2025", status: "Active" },
    { id: 2, name: "Isaac Nabasa", email: "isaac@gmail.com", year: "2024", status: "Pending" },
  ]);

  // Update status handler
  const updateStatus = (id, newStatus) => {
    const updatedMentees = mentees.map((mentee) =>
      mentee.id === id ? { ...mentee, status: newStatus } : mentee
    );
    setMentees(updatedMentees);
  };

  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Year</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {mentees.map((mentee) => (
            <tr key={mentee.id}>
              <td className="px-4 py-2 whitespace-nowrap">{mentee.name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{mentee.email}</td>
              <td className="px-4 py-2 whitespace-nowrap">{mentee.year}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <StatusButtons mentee={mentee} onStatusChange={updateStatus} />
              </td>
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
