// src/components/AddDemandsPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './css/quotationCall.css'; // Ensure this CSS file is present for styling


const AddDemandsPage = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 quotation-call">Quotation Call</h2>
      <img src="/crd logo.png" alt="CRD Logo" className="img-fluid mx-auto d-block mb-4 logo10" /> {/* Bootstrap image classes for alignment */}
      <div className="d-flex justify-content-center Projects-others">
        <Link to="/quotation-call/projects" className="btn btn-secondary mx-2 nav-box10">
          Projects
        </Link>
        <Link to="/quotation-call/others" className="btn btn-secondary mx-2 nav-box10">
          Others
        </Link>
      </div>
    </div>
  );
};

export default AddDemandsPage;
