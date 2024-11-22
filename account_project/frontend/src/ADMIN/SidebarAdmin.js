import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Make sure Bootstrap Icons are installed
import './css/sidebarAdmin.css'; // Additional custom CSS

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here, such as clearing authentication tokens
    console.log('Logging out...');
    // Redirect to the login page or home page
    navigate('/login');
  };

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
      <div className="mt-auto w-100">
        <Nav.Link onClick={handleLogout} className="text-white sidebar-link">
          <i className="bi bi-box-arrow-right me-2"></i>Logout
        </Nav.Link>
      </div>
    </div>
  );
};

export default Sidebar;
