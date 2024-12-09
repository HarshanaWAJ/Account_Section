import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SidebarAccountant';
import axiosInstance from '../axiosInstance';  // Import the axios instance
import './css/accountantDashboard.css';
import { FaProjectDiagram, FaShoppingCart, FaFileInvoiceDollar, FaRegBell } from 'react-icons/fa';
import { BsBriefcase } from "react-icons/bs";
import { BsBriefcaseFill } from "react-icons/bs";


// Import Chart.js and React-Chartjs-2
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AccountantDashboard = () => {
  const [projectCount, setProjectCount] = useState(null);
  const [otherDemandCount, setOtherDemandCount] = useState(null);
  const [projectDemandCount, setProjectDemandCount] = useState(null);
  const [demandsOnProgressCount, setDemandsOnProgressCount] = useState(null);
  const [procrumentComittedCount, setProcrumentComittedCount] = useState(null);
  const [quotationCalledDemandCount, setQuotationCalledDemandCount] = useState(null);
  const [wingWiseProjectCount, setWingWiseProjectCount] = useState([]);
  const [wingWiseDemandCount, setWingWiseDemandCount] = useState([]); // New state for demand counts
  const [voteWiseDemandCount, setVoteWiseDemandCount] = useState([]);

  // Fetch Data on Component Mount
  useEffect(() => {
    axiosInstance.get('/api/project/get-count')
      .then(response => setProjectCount(response.data))
      .catch(error => console.error('Error fetching project count', error));
    
    axiosInstance.get('/api/demands/get-other-demand-count')
      .then(response => setOtherDemandCount(response.data))
      .catch(error => console.error('Error fetching other demand count', error));

    axiosInstance.get('/api/demands/get-project-demand-count')
      .then(response => setProjectDemandCount(response.data))
      .catch(error => console.error('Error fetching project demand count', error));

    axiosInstance.get('/api/demands/get-on-progress-demand-count')
      .then(response => setDemandsOnProgressCount(response.data))
      .catch(error => console.error('Error fetching on progress demand count', error));

    axiosInstance.get('/api/demands/get-procrument-comitted-demand-count')
      .then(response => setProcrumentComittedCount(response.data))
      .catch(error => console.error('Error fetching procurement committed demand count', error));

    axiosInstance.get('/api/demands/get-quotation-called-demand-count')
      .then(response => setQuotationCalledDemandCount(response.data))
      .catch(error => console.error('Error fetching quotation called demand count', error));

    axiosInstance.get('/api/project/get-count-wing-wise')
      .then(response => setWingWiseProjectCount(response.data))
      .catch(error => console.error('Error fetching wing-wise project count', error));

    axiosInstance.get('/api/demands/project-demand-count-by-wing')
      .then(response => setWingWiseDemandCount(response.data))
      .catch(error => console.error('Error fetching wing-wise project demand count', error));

    axiosInstance.get('/api/demands/other-demand-count-by-wing')
      .then(response => setVoteWiseDemandCount(response.data))
      .catch(error => console.error('Error fetching wing-wise other demand count', error));
  }, []);

  // Prepare data for the "Project Count by Wing" chart
  const chartDataProjectCount = {
    labels: wingWiseProjectCount.map(item => item[0]), // Wing names
    datasets: [
      {
        label: 'Project Count',
        data: wingWiseProjectCount.map(item => item[1]), // Project count
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  // Prepare data for the "Project Demand Count by Wing" chart
  const chartDataProjectDemandCount = {
    labels: wingWiseDemandCount.map(item => item[1]),  // Get wing names (second element in each array)
    datasets: [
      {
        label: 'Project Demand Count by Wing',
        data: wingWiseDemandCount.map(item => item[0]), // Get demand counts (first element in each array)
        backgroundColor: 'rgba(153, 102, 255, 0.4)', // Light purple
        borderColor: 'rgba(153, 102, 255, 1)',       // Dark purple
        borderWidth: 1,
      }
    ]
  };

  // Prepare data for the "Other Demand Count by Wing" chart
  const chartDataOtherDemandCount = {
    labels: voteWiseDemandCount.map(item => item[1]),  // Get wing names (second element in each array)
    datasets: [
      {
        label: 'Other Demand Count by Wing',
        data: voteWiseDemandCount.map(item => item[0]), // Get demand counts (first element in each array)
        backgroundColor: 'rgba(255, 159, 64, 0.4)', // Light orange
        borderColor: 'rgba(255, 159, 64, 1)',       // Dark orange
        borderWidth: 1,
      }
    ]
  };

  const projecCountChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to resize
    plugins: {
      title: {
        display: true,
        text: 'Summary',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} projects`;
          }
        }
      }
    },
    scales: {
      x: { beginAtZero: true, title: { display: true, text: 'Wing' } },
      y: { beginAtZero: true, title: { display: true, text: 'Project Count' } }
    }
  };

  const ProjectDemandCountchartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Summary',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} demands`;
          }
        }
      }
    },
    scales: {
      x: { beginAtZero: true, title: { display: true, text: 'Wing' } },
      y: { beginAtZero: true, title: { display: true, text: 'Demand Count' } }
    }
  };

  const OtherDemandCountchartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Summary',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} demands`;
          }
        }
      }
    },
    scales: {
      x: { beginAtZero: true, title: { display: true, text: 'Vote' } },
      y: { beginAtZero: true, title: { display: true, text: 'Demand Count' } }
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="admin-dashboard flex-grow-1 p-4">
        <div className="welcome-note p-4 my-4">
          <h3>Welcome, Accountant</h3>
        </div>

        <div className="card-container-acc-dashboard d-flex flex-wrap justify-content-between">
          <div className="card-acc-dashboard p-4 my-2 text-center rounded shadow-sm">
            <FaProjectDiagram size={30} className="mb-3" />
            <h3>Total Projects</h3>
            <p>{projectCount !== null ? projectCount : 'Loading...'}</p>
          </div>

          <div className="card-acc-dashboard p-4 my-2 text-center rounded shadow-sm">
            <BsBriefcase size={30} className="mb-3" />
            <h3>Other Demands</h3>
            <p>{otherDemandCount !== null ? otherDemandCount : 'Loading...'}</p>
          </div>

          <div className="card-acc-dashboard p-4 my-2 text-center rounded shadow-sm">
            <BsBriefcaseFill size={30} className="mb-3" />
            <h3>Project Demands</h3>
            <p>{projectDemandCount !== null ? projectDemandCount : 'Loading...'}</p>
          </div>

          <div className="card-acc-dashboard p-4 my-2 text-center rounded shadow-sm">
            <FaShoppingCart size={30} className="mb-3" />
            <h3>On Progress Demands</h3>
            <p>{demandsOnProgressCount !== null ? demandsOnProgressCount : 'Loading...'}</p>
          </div>

          <div className="card-acc-dashboard p-4 my-2 text-center rounded shadow-sm">
            <FaFileInvoiceDollar size={30} className="mb-3" />
            <h3>Procurement Committed</h3>
            <p>{procrumentComittedCount !== null ? procrumentComittedCount : 'Loading...'}</p>
          </div>

          <div className="card-acc-dashboard p-4 my-2 text-center rounded shadow-sm">
            <FaRegBell size={30} className="mb-3" />
            <h3>Quotation Called Demands</h3>
            <p>{quotationCalledDemandCount !== null ? quotationCalledDemandCount : 'Loading...'}</p>
          </div>
        </div>

        {/* Render Bar Charts in a responsive layout */}
        <div className="wing-wise-project-count">
          <h4>Project Summary</h4>
          {wingWiseProjectCount.length > 0 ? (
            <div style={{ height: '300px', width: '100%' }}>
              <Bar data={chartDataProjectCount} options={projecCountChartOptions} />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="wing-wise-project-count">
          <h4>Project Demand Summary</h4>
          {wingWiseDemandCount.length > 0 ? (
            <div style={{ height: '300px', width: '100%' }}>
              <Bar data={chartDataProjectDemandCount} options={ProjectDemandCountchartOptions} />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="wing-wise-project-count">
          <h4>Other Demand Summary</h4>
          {voteWiseDemandCount.length > 0 ? (
            <div style={{ height: '300px', width: '100%' }}>
              <Bar data={chartDataOtherDemandCount} options={OtherDemandCountchartOptions} />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AccountantDashboard;
