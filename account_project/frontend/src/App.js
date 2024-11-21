// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './LOGIN/welcome'; 
import Login from './LOGIN/Login';
import AdminDashboard from './ADMIN/AdminDashboard';
import AddOfficer from './ADMIN/AddOfficer';
import ManageOfficers from './ADMIN/ManageOfficers';
import AddProjects from './ADMIN/AddProjects'; 
import ManageProjects from './ADMIN/ManageProjects';
import EditProjectForm from './ADMIN/EditProjectForm';
import ClerkDashboard from './CLERK/ClerkDashboard';
import Projects from './CLERK/Projects';
import Others from './CLERK/Others';
import AccountantDashboard from './ACCOUNTANT/AccountantDashboard';
import AddQuotationCall from './CLERK/Quotations/AddQuotationCall'
import DG from './CLERK/DG'
import RPC from './CLERK/RPC'
import MPC from './CLERK/MPC'
import PurchaseOrderPlace from './CLERK/PurchaseOrderPlace';
import LedgerAndPayment from './CLERK/LedgerAndPayment';
import AdhocRequest from './CLERK/AdhocRequest';
import AdvanceReceived from './CLERK/AdvanceReceived';
import AdvanceSettlement from './CLERK/AdvanceSettlement';
import PettyCash from './CLERK/PettyCash';
import ViewDemand from './CLERK/ViewDemand';
import Swal from 'sweetalert2';


const App = () => {

  const [authToken, setAuthToken] = useState(null);
  const [authRole, setAuthRole] = useState(null);

  console.log("auth Token", authToken);
  console.log("auth Role", authRole);
  
  
   // Check if the token is in localStorage when the app mounts
   useEffect(() => {
    const token = localStorage.getItem('qmsAuthToken');
    const role = localStorage.getItem('qmsAuthRole');
    if (token && role) {
      setAuthToken(token);
      setAuthRole(role);
    }
  }, []);

  // Function for check login status
  function checkLoginToken() {
    if (authToken == null) {
      Navigate('/login')
      Swal.fire({ 
        icon: 'warning',
        title: 'Authentication Error',
        text: 'You need to Login First!',
        confirmButtonText: 'OK'
      })
    }
  }

    // PrivateRoute component to protect routes
    const PrivateRoute = ({ element }) => {
      checkLoginToken(); // Check if user is authenticated
      return element;
    };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/admin-dashboard" element={<PrivateRoute element={<AdminDashboard /> } />} />
        <Route path="/admin-dashboard/add-officers" element={<AddOfficer />} />
        <Route path="/admin-dashboard/manage-officers" element={<ManageOfficers />} />
        <Route path="/admin-dashboard/add-projects" element={<AddProjects />} />
        <Route path="/admin-dashboard/manage-projects" element={<ManageProjects />} />
        <Route path="/admin-dashboard/edit-projects/:id" element={<EditProjectForm />} />

        <Route path="/clerk-dashboard" element={<ClerkDashboard />} />
        <Route path="/add-demands/projects" element={<Projects />} />
        <Route path="/add-demands/others" element={<Others />} />
        <Route path="/clerk-dashboard/add-quotation-call" element={<AddQuotationCall/>}/>
        <Route path='/clerk-dashboard/add-procument-committee-dg' element={<DG/>} />
        <Route path='/clerk-dashboard/add-procument-committee-rpc' element={<RPC/>} />
        <Route path='/clerk-dashboard/add-procument-committee-mpc' element={<MPC/>} />
        <Route path="/clerk-dashboard/purchase-order-place" element={<PurchaseOrderPlace />} />
        <Route path="/clerk-dashboard/ledger-and-payment" element={<LedgerAndPayment />} />
        <Route path="/clerk-dashboard/adhoc/request" element={<AdhocRequest />} />
        <Route path="/clerk-dashboard/adhoc/received" element={<AdvanceReceived />} />
        <Route path="/clerk-dashboard/adhoc/settlement" element={<AdvanceSettlement />} />
        <Route path="/clerk-dashboard/PettyCash" element={<PettyCash />} />
        <Route path="/clerk-dashboard/view-demand" element={<ViewDemand />} />

        <Route path="/accountant-dashboard" element={<AccountantDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;