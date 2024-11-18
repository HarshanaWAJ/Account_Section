import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Make sure Bootstrap Icons are installed
import './css/sidebarAdmin.css'; // Additional custom CSS

const Sidebar = () => {
  return (
    <div className="sidebar bg-dark text-white p-4 vh-100 d-flex flex-column align-items-start sticky-top">
      <h2 className="text-white mb-4">Admin Portal</h2>
      <Nav className="flex-column w-100">
        <Nav.Link as={Link} to="/admin-dashboard/add-officers" className="text-white sidebar-link">
          <i className="bi bi-person-plus me-2"></i>Add Officers
        </Nav.Link>
        <Nav.Link as={Link} to="/admin-dashboard/manage-officers" className="text-white sidebar-link">
          <i className="bi bi-person-lines-fill me-2"></i>Manage Officers
        </Nav.Link>
        <Nav.Link as={Link} to="/admin-dashboard/add-projects" className="text-white sidebar-link">
          <i className="bi bi-folder-plus me-2"></i>Add Projects
        </Nav.Link>
        <Nav.Link as={Link} to="/admin-dashboard/manage-projects" className="text-white sidebar-link">
          <i className="bi bi-folder-fill me-2"></i>Manage Projects
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
