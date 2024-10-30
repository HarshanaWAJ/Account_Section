// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import AddDemands from './CLERK/AddDemands';
import Projects from './CLERK/Projects';
import Others from './CLERK/Others';
import QuotationCall from './CLERK/QuotationCall';
import AccountantDashboard from './ACCOUNTANT/AccountantDashboard';
import QCproject from './CLERK/QCProject';
import QCOthers from './CLERK/QCOthers';

import AddQuotationCall from './CLERK/Quotations/AddQuotationCall'

// procument-committee
import DG from './CLERK/DG'
import RPC from './CLERK/RPC'
import MPC from './CLERK/MPC'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/add-officers" element={<AddOfficer />} />
        <Route path="/admin-dashboard/manage-officers" element={<ManageOfficers />} />
        <Route path="/admin-dashboard/add-projects" element={<AddProjects />} />
        <Route path="/admin-dashboard/manage-projects" element={<ManageProjects />} />
        <Route path="/admin-dashboard/edit-projects/:id" element={<EditProjectForm />} />

        <Route path="/clerk-dashboard" element={<ClerkDashboard />} />
        <Route path="/clerk-dashboard/add-demands" element={<AddDemands />} />
        <Route path="/add-demands/projects" element={<Projects />} />
        <Route path="/add-demands/others" element={<Others />} />
        <Route path="/clerk-dashboard/quotation-call" element={<QuotationCall />} />
        <Route path="/quotation-call/projects" element={<QCproject />} />
        <Route path="/quotation-call/others" element={<QCOthers />} />

        <Route path="/clerk-dashboard/add-quotation-call" element={<AddQuotationCall/>}/>

        {/* Routes for procument-committee */}
        <Route path='/clerk-dashboard/add-procument-committee-dg' element={<DG/>} />
        <Route path='/clerk-dashboard/add-procument-committee-rpc' element={<RPC/>} />
        <Route path='/clerk-dashboard/add-procument-committee-mpc' element={<MPC/>} />

        <Route path="/accountant-dashboard" element={<AccountantDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
