// src/AdminDashboard.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './css/adminDashboard.css'; // Ensure this CSS file is present for styling

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <img src="/crd logo.png" alt="CRD Logo" className="logo3" /> {/* Add the image here */}
      <main className="dashboard-content">
        <div className="nav-container">
          <div className="nav-box"><Link to="add-officers">Add Officers</Link></div>
          <div className="nav-box"><Link to="manage-officers">Manage Officers</Link></div>
          <div className="nav-box"><Link to="add-projects">Add Projects</Link></div>
          <div className="nav-box"><Link to="manage-projects">Manage Projects</Link></div>
        </div>
        <Outlet /> {/* This will render the child routes */}
      </main>
    </div>  
  );
};

export default AdminDashboard;



