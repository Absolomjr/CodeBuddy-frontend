import React from "react";
import MenteeSearchFilter from "./MenteeSearchFilter";
import MenteeTable from "./MenteeTable";
import MenteeActions from "./MenteeActions";
import MenteeForm from "./MenteeForm";
import MenteeStatsCard from "./MenteeStatsCard";
import { useNavigate } from "react-router-dom";

const MenteesDashboard = () => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Manage Mentees</h2>
      <MenteeStatsCard />
      <MenteeSearchFilter />
      <MenteeTable />
    </div>
  );
};

export default MenteesDashboard;
