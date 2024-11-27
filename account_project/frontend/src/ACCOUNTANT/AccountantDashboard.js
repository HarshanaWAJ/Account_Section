import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SidebarAccountant';
import axiosInstance from '../axiosInstance';  // Import the axios instance
import './css/accountantDashboard.css';

const AccountantDashboard = () => {
  const [projectCount, setProjectCount] = useState(null);  // State to hold project count
  const [otherDemandCount, setOtherDemandCount] = useState(null);

  useEffect(() => {
    axiosInstance.get('/api/project/get-count')
      .then(response => {
        setProjectCount(response.data);  // Set the project count from API response
      })
      .catch(error => {
        console.error('There was an error fetching the project count!', error);
      });
  }, []);  // Empty array means this runs once when the component mounts

  useEffect(() => {
    axiosInstance.get('/api/demands/get-other-demand-count')
      .then(response => {
        setOtherDemandCount(response.data);  // Set the project count from API response
      })
      .catch(error => {
        console.error('There was an error fetching the other demand count!', error);
      });
  }, []); 

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="admin-dashboard flex-grow-1 p-4">
        {/* Welcome Note */}
        <div className="welcome-note p-4 my-4 text-white rounded shadow-sm">
          <h12>Welcome, Accountant!</h12>
        </div>
        <h1>Accountant Dashboard</h1>

        {/* Display project count */}
        <div className="project-count p-4 my-4 text-white rounded shadow-sm">
          <h3>Total Projects: {projectCount !== null ? projectCount : 'Loading...'}</h3>
        </div>

        {/* Display other demand count */}
        <div className="project-count p-4 my-4 text-white rounded shadow-sm">
          <h3>Other Demands: {otherDemandCount !== null ? otherDemandCount : 'Loading...'}</h3>
        </div>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AccountantDashboard;
