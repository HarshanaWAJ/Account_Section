import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './css/accountantDashboard.css'; // Ensure this CSS file is present for styling

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Accountant Dashboard</h1>
      <img src="/crd logo.png" alt="CRD Logo" className="logo7" /> {/* Add the image here */}
      <main className="dashboard-content-acc">
        <div className="nav-container-acc">
          <Link to="add-officers" className="nav-box-acc">
            <div>Update</div>
          </Link>
          <Link to="manage-officers" className="nav-box-acc">
            <div>View</div>
          </Link>
          <Link to="add-projects" className="nav-box-acc">
            <div>Delete</div>
          </Link>
        </div>
        <Outlet /> {/* This will render the child routes */}
      </main>
    </div>
  );
};

export default AdminDashboard;