import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup"; 
import Login from "./components/Login";
import { Link } from "react-router-dom";
import MenteeDashboard from "./components/MenteeDashboard";
import MentorDashboard from "./components/MentorDashboard";
import { UserProvider, useUser } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard" 
import MenteesDashboard from "./components/MenteeDashboard";


import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'




function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Protected Mentee Routes */}
          <Route path="/mentee-dashboard" 
          element= {
            <ProtectedRoute role ="Mentee">
              <MenteeDashboard />
            </ProtectedRoute>
          }
          />
          {/* Protected Mentor Routes */}
          <Route path="/mentor-dashboard" 
          element ={
            <ProtectedRoute role ="Mentor">
              <MentorDashboard />
            </ProtectedRoute>
          }
          />
          {/* Protected Admin Routes */}
          <Route path="/admin-dashboard"
          element ={
            <ProtectedRoute role="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
          />

          
          {/* Protected Mentees Dashboard for Admin */}
          <Route path="/mentees"
          element={ 
          <ProtectedRoute role="Admin">
            <MenteesDashboard />
          </ProtectedRoute>
          }
          />

      
          {/* {/* Default route redirects to login or can be customized */}
          <Route path="/" element={<Navigate to="/login" replace />} /> 

          
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App
