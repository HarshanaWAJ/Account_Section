import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './css/procumentCommittee.css'; // Ensure this CSS file is present for styling
import Sidebar from './SidebarClerk';


const ProcumentCommittee = () => {
  return (
    <div className="d-flex">
        <Sidebar />
    <div className="container mt-4">
      <h2 className="text-center mb-4 procument-committee">Procument Committee</h2>
      <img src="/crd logo.png" alt="CRD Logo" className="img-fluid mx-auto d-block mb-4 logo11" /> {/* Bootstrap image classes for alignment */}
      <div className="d-flex justify-content-center Pro-Committee">
        <Link to="/procument-committee/dg" className="btn btn-secondary mx-2 nav-box11">
          DG
        </Link>
        <Link to="/procument-committee/rpc" className="btn btn-secondary mx-2 nav-box11">
          RPC
        </Link>
        <Link to="/procument-committee/mpc" className="btn btn-secondary mx-2 nav-box11">
          MPC
        </Link>
      </div>
    </div>
    </div>
  );
};

export default ProcumentCommittee;