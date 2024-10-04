// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './LOGIN/welcome'; 
import Login from './LOGIN/Login';
//import Register from './LOGIN/Register';
import AdminDashboard from './ADMIN/AdminDashboard';
import AddOfficer from './ADMIN/AddOfficer';
import ManageOfficers from './ADMIN/ManageOfficers';
import AddProjects from './ADMIN/AddProjects'; // Import the new AddProject component
import ManageProjects from './ADMIN/ManageProjects';

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
      </Routes>
    </Router>
  );
};

export default App;
