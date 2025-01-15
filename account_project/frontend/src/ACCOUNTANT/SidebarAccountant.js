import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate here
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure Bootstrap Icons are installed
import './css/sidebarAccountant.css'; // Additional custom CSS

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle logout
  const handleLogout = () => {
    // Clear session or authentication tokens if necessary
    // Redirect to login page
    navigate('/login'); // Navigate to login page
  };

  return (
    <div className="sidebar bg-dark text-white p-4 vh-100 d-flex flex-column align-items-start sticky-top">
      <h2 className="text-white mb-4" style={{ fontSize: '25px' }}>Accountant Portal</h2>

      {/* Sidebar Links */}
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/accountant-dashboard/vote-summary" className="text-white sidebar-link">
          <i className="bi bi-chat-left-text me-2"></i>Vote Summary
        </Nav.Link>

        <Nav.Link as={Link} to="/accountant-dashboard/project-summary" className="text-white sidebar-link">
          <i className="bi bi-chat-left-text me-2"></i>Project Summary
        </Nav.Link>

        <Nav.Link as={Link} to="/accountant-dashboard/manage-demands" className="text-white sidebar-link">
          <i className="bi bi-chat-left-text me-2"></i>Manage Demands
        </Nav.Link>

        <Nav.Link as={Link} to="/accountant-dashboard/manage-procurements" className="text-white sidebar-link">
          <i className="bi bi-chat-left-text me-2"></i>Manage Procurements
        </Nav.Link>

        <Nav.Link as={Link} to="/accountant-dashboard/manage-qc" className="text-white sidebar-link">
          <i className="bi bi-chat-left-text me-2"></i>Manage Quotation Calls
        </Nav.Link>

        <Nav.Link as={Link} to="/accountant-dashboard/manage-po" className="text-white sidebar-link">
          <i className="bi bi-chat-left-text me-2"></i>Manage PO
        </Nav.Link>

        <Nav.Link as={Link} to="/accountant-dashboard/manage-ledger" className="text-white sidebar-link">
          <i className="bi bi-chat-left-text me-2"></i>Manage Ledger
        </Nav.Link>

        <Nav.Link as={Link} to="/accountant-dashboard/manage-ad-hocs" className="text-white sidebar-link">
          <i className="bi bi-chat-left-text me-2"></i>Manage Ad-Hocs
        </Nav.Link>

        <Nav.Link as={Link} to="/accountant-dashboard/manage-petty-cash" className="text-white sidebar-link">
          <i className="bi bi-chat-left-text me-2"></i>Manage Petty Cash
        </Nav.Link>

        {/* Logout */}
        <Nav.Link
          onClick={handleLogout}
          className="text-white sidebar-link mt-auto d-flex align-items-center"
        >
          <i className="bi bi-box-arrow-right me-2"></i>Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
