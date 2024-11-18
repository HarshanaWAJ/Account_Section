import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure Bootstrap Icons are installed
import './css/sidebarAccountant.css'; // Additional custom CSS

const Sidebar = () => {
  const [addDemandsOpen, setAddDemandsOpen] = useState(false);
  const [procurementCommitteeOpen, setProcurementCommitteeOpen] = useState(false);

  const toggleAddDemands = () => setAddDemandsOpen(!addDemandsOpen);
  const toggleProcurementCommittee = () => setProcurementCommitteeOpen(!procurementCommitteeOpen);

  return (
    <div className="sidebar bg-dark text-white p-4 vh-100 d-flex flex-column align-items-start sticky-top">
      <h2 className="text-white mb-4" style={{ fontSize: '25px' }}>Accountant Portal</h2>

    </div>
  );
};

export default Sidebar;
