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