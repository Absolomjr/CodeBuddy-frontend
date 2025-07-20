import React from "react";
import MenteeActions from "./MenteeActions";

const MenteeTable = () => {
  const mentees = [
    { id: 1, name: "Absolom Jr", email: "absolom@example.com", cohort: "2025" },
    { id: 2, name: "Jane Doe", email: "jane@example.com", cohort: "2024" },
  ];

  return (
    <table className="min-w-full table-auto border">
      <thead className="bg-blue-700 text-white">
        <tr>
          <th className="p-2">Name</th>
          <th className="p-2">Email</th>
          <th className="p-2">Cohort</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {mentees.map((mentee) => (
          <tr key={mentee.id} className="border-t">
            <td className="p-2">{mentee.name}</td>
            <td className="p-2">{mentee.email}</td>
            <td className="p-2">{mentee.cohort}</td>
            <td className="p-2">
              <MenteeActions mentee={mentee} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MenteeTable;
