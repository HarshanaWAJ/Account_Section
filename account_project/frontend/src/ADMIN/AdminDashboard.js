import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SidebarAdmin';
import './css/adminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="admin-dashboard flex-grow-1 p-4">
        {/* Welcome Note */}
      <div className="welcome-note p-4 my-4 text-white rounded shadow-sm">
          <h12>Welcome, Admin!</h12>
        </div>
        <h1>Admin Dashboard</h1>
        
        <img src="/crd logo.png" alt="CRD Logo" className="logo3" />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
