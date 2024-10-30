import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './css/clerkDashboard.css'; // Ensure this CSS file is present for styling

const ClerkDashboard = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center clerk-dashboard">Clerk Dashboard</h1>
      <img src="/crd logo.png" alt="CRD Logo" className="img-fluid mx-auto d-block mb-4 logo4" /> {/* Add the image here */}
      <main className="dashboard-content2">
        <div className='option-bar'>
          <div className="nav-container mb-4"> 
            <Link to="add-demands" className="nav-box1">
              Add Demands
            </Link>
            <Link to="add-quotation-call" className="nav-box1">
              Quotation Call
            </Link>
            <Link to="/clerk-dashboard/add-procument-committee" className="nav-box1">
              Procument Committee
            </Link>
            <Link to="purchase-order-place" className="nav-box1">
              Purchase Order Place
            </Link>
            <Link to="ledger-and-payment" className="nav-box1">
              Ledger & Payment
            </Link>
          </div>
        </div>
        <Outlet /> {/* This will render the child routes */}
      </main>
    </div>
  );
};

export default ClerkDashboard;
