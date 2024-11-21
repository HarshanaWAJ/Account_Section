// src/components/AddDemandsPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './css/addDemands.css'; // Ensure this CSS file is present for styling
import Sidebar from './SidebarClerk';

const AddDemandsPage = () => {
  return (
    <div className="d-flex">
        <Sidebar />
    <div className="container mt-4">
      <h2 className="text-center mb-4 add-demands">Add Demands</h2>
      <img src="/crd logo.png" alt="CRD Logo" className="img-fluid mx-auto d-block mb-4 logo5" /> {/* Bootstrap image classes for alignment */}
      <div className="d-flex Projects-others999">
        <Link to="/add-demands/projects" className="btn btn-secondary mx-2 nav-box002">
          Projects
        </Link>
        <Link to="/add-demands/others" className="btn btn-secondary mx-2 nav-box002">
          Others(MT/Qstor)
        </Link>
      </div>
    </div>
    </div>
  );
};

export default AddDemandsPage;
