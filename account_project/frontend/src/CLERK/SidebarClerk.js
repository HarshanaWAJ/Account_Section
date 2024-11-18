import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure Bootstrap Icons are installed
import './css/sidebarClerk.css'; // Additional custom CSS

const Sidebar = () => {
  const [addDemandsOpen, setAddDemandsOpen] = useState(false);
  const [procurementCommitteeOpen, setProcurementCommitteeOpen] = useState(false);
  const [cashAdvanceOpen, setCashAdvanceOpen] = useState(false); // New state for Cash Advance submenu

  const toggleAddDemands = () => setAddDemandsOpen(!addDemandsOpen);
  const toggleProcurementCommittee = () => setProcurementCommitteeOpen(!procurementCommitteeOpen);
  const toggleCashAdvance = () => setCashAdvanceOpen(!cashAdvanceOpen); // Toggle function for Cash Advance submenu
  
  return (
    <div className="sidebar bg-dark text-white p-4 vh-100 d-flex flex-column align-items-start sticky-top">
      <h2 className="text-white mb-4">Clerk Portal</h2>
      <Nav className="flex-column w-100">
        {/* Add Demands */}
        <div>
          <Nav.Link
            onClick={toggleAddDemands}
            className="text-white sidebar-link d-flex align-items-center"
          >
            <i className="bi bi-plus-circle me-2"></i>Add Demands
          </Nav.Link>
          <Nav className={`flex-column ps-4 ${addDemandsOpen ? 'show' : 'collapse'}`}>
            <Nav.Link as={Link} to="/add-demands/projects" className="text-white sidebar-link">
              <i className="bi bi-briefcase me-2"></i>Projects
            </Nav.Link>
            <Nav.Link as={Link} to="/add-demands/others" className="text-white sidebar-link">
              <i className="bi bi-briefcase me-2"></i>Others (MT/Qstor)
            </Nav.Link>
          </Nav>
        </div>

        {/* Other Links */}
        <Nav.Link as={Link} to="/clerk-dashboard/add-quotation-call" className="text-white sidebar-link">
          <i className="bi bi-chat-left-text me-2"></i>Quotation Call
        </Nav.Link>

        {/* Procurement Committee */}
        <div>
          <Nav.Link
            onClick={toggleProcurementCommittee}
            className="text-white sidebar-link d-flex align-items-center"
          >
            <i className="bi bi-folder me-2"></i>Procurement Committee
          </Nav.Link>
          <Nav className={`flex-column ps-4 ${procurementCommitteeOpen ? 'show' : 'collapse'}`}>
            <Nav.Link as={Link} to="/clerk-dashboard/add-procument-committee-dg" className="text-white sidebar-link">
              <i className="bi bi-file-earmark-text me-2"></i>DG
            </Nav.Link>
            <Nav.Link as={Link} to="/clerk-dashboard/add-procument-committee-rpc" className="text-white sidebar-link">
              <i className="bi bi-file-earmark-text me-2"></i>RPC
            </Nav.Link>
            <Nav.Link as={Link} to="/clerk-dashboard/add-procument-committee-mpc" className="text-white sidebar-link">
              <i className="bi bi-file-earmark-text me-2"></i>MPC
            </Nav.Link>
          </Nav>
        </div>

        <Nav.Link as={Link} to="/clerk-dashboard/purchase-order-place" className="text-white sidebar-link">
          <i className="bi bi-cart-plus me-2"></i>Purchase Order Place
        </Nav.Link>

        <Nav.Link as={Link} to="/clerk-dashboard/ledger-and-payment" className="text-white sidebar-link">
          <i className="bi bi-file-earmark-spreadsheet me-2"></i>Ledger And Payments
        </Nav.Link>

        {/* Cash Advance / Ad-hoc */}
        <div>
          <Nav.Link
            onClick={toggleCashAdvance}
            className="text-white sidebar-link d-flex align-items-center">
            <i className="bi bi-cash-stack me-2"></i>Cash Advance / Ad-hoc
          </Nav.Link>
          <Nav className={`flex-column ps-4 ${cashAdvanceOpen ? 'show' : 'collapse'}`}>
            <Nav.Link as={Link} to="/clerk-dashboard/adhoc/request" className="text-white sidebar-link">
              <i className="bi bi-pencil-square me-2"></i>Advance / Adhoc Request
            </Nav.Link>
            <Nav.Link as={Link} to="/clerk-dashboard/adhoc/received" className="text-white sidebar-link">
              <i className="bi bi-box-arrow-in-down me-2"></i>Advance Received
            </Nav.Link>
            <Nav.Link as={Link} to="/clerk-dashboard/adhoc/settlement" className="text-white sidebar-link">
              <i className="bi bi-file-check me-2"></i>Advance Settlement
            </Nav.Link>
            </Nav>
        </div>

        <Nav.Link as={Link} to="/clerk-dashboard/PettyCash" className="text-white sidebar-link">
          <i className="bi bi-wallet me-2"></i>Petty Cash
        </Nav.Link>


        <Nav.Link as={Link} to="/clerk-dashboard/view-demand" className="text-white sidebar-link">
          <i className="bi bi-card-list me-2"></i>View Demands
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
