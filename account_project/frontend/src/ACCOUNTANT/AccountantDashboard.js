import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SidebarAccountant';
import axiosInstance from '../axiosInstance';  // Import the axios instance
import './css/accountantDashboard.css';
import { FaProjectDiagram, FaShoppingCart, FaFileInvoiceDollar, FaRegBell } from 'react-icons/fa';
import { BsBriefcase } from "react-icons/bs";
import { BsBriefcaseFill } from "react-icons/bs";


const AccountantDashboard = () => {
  const [projectCount, setProjectCount] = useState(null);
  const [otherDemandCount, setOtherDemandCount] = useState(null);
  const [projectDemandCount, setProjectDemandCount] = useState(null);
  const [demandsOnProgressCount, setDemandsOnProgressCount] = useState(null);
  const [procrumentComittedCount, setProcrumentComittedCount] = useState(null);
  const [quotationCalledDemandCount, setQuotationCalledDemandCount] = useState(null);

  useEffect(() => {
    axiosInstance.get('/api/project/get-count')
      .then(response => {
        setProjectCount(response.data);
      })
      .catch(error => {
        console.error('Error fetching project count', error);
      });
  }, []);

  useEffect(() => {
    axiosInstance.get('/api/demands/get-other-demand-count')
      .then(response => {
        setOtherDemandCount(response.data);
      })
      .catch(error => {
        console.error('Error fetching other demand count', error);
      });
  }, []);

  useEffect(() => {
    axiosInstance.get('/api/demands/get-project-demand-count')
      .then(response => {
        setProjectDemandCount(response.data);
      })
      .catch(error => {
        console.error('Error fetching project demand count', error);
      });
  }, []);

  useEffect(() => {
    axiosInstance.get('/api/demands/get-on-progress-demand-count')
      .then(response => {
        setDemandsOnProgressCount(response.data);
      })
      .catch(error => {
        console.error('Error fetching on progress demand count', error);
      });
  }, []);

  useEffect(() => {
    axiosInstance.get('/api/demands/get-procrument-comitted-demand-count')
      .then(response => {
        setProcrumentComittedCount(response.data);
      })
      .catch(error => {
        console.error('Error fetching procurement committed demand count', error);
      });
  }, []);

  useEffect(() => {
    axiosInstance.get('/api/demands/get-quotation-called-demand-count')
      .then(response => {
        setQuotationCalledDemandCount(response.data);
      })
      .catch(error => {
        console.error('Error fetching quotation called demand count', error);
      });
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="admin-dashboard flex-grow-1 p-4">
        <div className="welcome-note p-4 my-4 text-white rounded shadow-sm">
          <h3>Welcome, Accountant!</h3>
        </div>
        <h1>Accountant Dashboard</h1>

        {/* Card Container without animation */}
        <div className="card-container-acc-dashboard d-flex flex-wrap justify-content-between">
          {/* Project Count Card */}
          <div className="card-acc-dashboard p-4 my-2 text-center rounded shadow-sm">
            <FaProjectDiagram size={30} className="mb-3" />
            <h3>Total Projects</h3>
            <p>{projectCount !== null ? projectCount : 'Loading...'}</p>
          </div>

          {/* Other Demand Count Card */}
          <div className="card-acc-dashboard p-4 my-2 text-center rounded shadow-sm">
            <BsBriefcase size={30} className="mb-3" />
            <h3>Other Demands</h3>
            <p>{otherDemandCount !== null ? otherDemandCount : 'Loading...'}</p>
          </div>

          {/* Project Demand Count Card */}
          <div className="card-acc-dashboard p-4 my-2 text-center rounded shadow-sm">
            <BsBriefcaseFill size={30} className="mb-3" />
            <h3>Project Demands</h3>
            <p>{projectDemandCount !== null ? projectDemandCount : 'Loading...'}</p>
          </div>

          {/* On Progress Demands Card */}
          <div className="card-acc-dashboard p-4 my-2 text-center rounded shadow-sm">
            <FaShoppingCart size={30} className="mb-3" />
            <h3>On Progress Demands</h3>
            <p>{demandsOnProgressCount !== null ? demandsOnProgressCount : 'Loading...'}</p>
          </div>

          {/* Procurement Committed Demands Card */}
          <div className="card-acc-dashboard p-4 my-2 text-center rounded shadow-sm">
            <FaFileInvoiceDollar size={30} className="mb-3" />
            <h3>Procurement Committed</h3>
            <p>{procrumentComittedCount !== null ? procrumentComittedCount : 'Loading...'}</p>
          </div>

          {/* Quotation Called Demands Card */}
          <div className="card-acc-dashboard p-4 my-2 text-center rounded shadow-sm">
            <FaRegBell size={30} className="mb-3" />
            <h3>Quotation Called Demands</h3>
            <p>{quotationCalledDemandCount !== null ? quotationCalledDemandCount : 'Loading...'}</p>
          </div>
        </div>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AccountantDashboard;
