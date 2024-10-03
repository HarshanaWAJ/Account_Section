// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './LOGIN/welcome'; 
import Login from './LOGIN/Login';
import Register from './LOGIN/Register';
import AdminDashboard from './ADMIN/AdminDashboard';
import AddOfficer from './ADMIN/AddOfficer';
import ManageOfficers from './ADMIN/ManageOfficers';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-officers" element={<AddOfficer />} />
        <Route path="/admin/manage-officers" element={<ManageOfficers />} />
      </Routes>
    </Router>
  );
};

export default App;
