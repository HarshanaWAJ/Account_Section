import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './css/adminDashboard.css'; // Ensure this CSS file is present for styling

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <img src="/crd logo.png" alt="CRD Logo" className="logo3" /> {/* Add the image here */}
      <main className="dashboard-content">
        <div className="nav-container001">
          <Link to="add-officers" className="nav-box">
            <div>Add Officers</div>
          </Link>
          <Link to="manage-officers" className="nav-box">
            <div>Manage Officers</div>
          </Link>
          <Link to="add-projects" className="nav-box">
            <div>Add Projects</div>
          </Link>
          <Link to="manage-projects" className="nav-box">
            <div>Manage Projects</div>
          </Link>
        </div>
        <Outlet /> {/* This will render the child routes */}
      </main>
    </div>
  );
};

export default AdminDashboard;




