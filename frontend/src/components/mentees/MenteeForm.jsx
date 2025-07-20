import React from "react";

const MenteeForm = ({ mentee = {}, onSubmit }) => {
  return (
    <form className="space-y-4">
      <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" defaultValue={mentee.name || ""} />
      <input type="email" placeholder="Email" className="w-full p-2 border rounded" defaultValue={mentee.email || ""} />
      <input type="text" placeholder="Cohort" className="w-full p-2 border rounded" defaultValue={mentee.cohort || ""} />
      <button type="submit" className="bg-blue-700 text-white p-2 rounded">Save</button>
    </form>
  );
};

export default MenteeForm;
