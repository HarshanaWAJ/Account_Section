import React from 'react';
import { Table } from 'react-bootstrap';
import Sidebar from './SidebarClerk';

const ViewProcurementCommittee = () => {
  return (
    <div className="d-flex">
        <Sidebar />
    <div className="container my-4">
      <h2 className="text-center mb-4">ProcurementCommittee</h2>
      <h2 className="text-center mb-4">DG</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-center equal-width">Reference No.</th>
            <th className="text-center equal-width">Approval Letter Date</th>
            <th className="text-center equal-width">Value</th>
            <th className="text-center equal-width">No.of Quotation Received</th>
            <th className="text-center equal-width">Suppliers</th>
          </tr>
        </thead>
        <tbody>
          {/* Rows will be added here when data is available */}
        </tbody>
      </Table>

      <h2 className="text-center mb-4">RPC</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-center equal-width">Reference No.</th>
            <th className="text-center equal-width">Send Date</th>
            <th className="text-center equal-width">Approved Date</th>
            <th className="text-center equal-width">Value</th>
            <th className="text-center equal-width">No.of Quotation Received</th>
            <th className="text-center equal-width">Suppliers</th>
          </tr>
        </thead>
        <tbody>
          {/* Rows will be added here when data is available */}
        </tbody>
      </Table>

      <h2 className="text-center mb-4">RMC</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-center equal-width">Reference No.</th>
            <th className="text-center equal-width">Send Date</th>
            <th className="text-center equal-width">Approved Date</th>
            <th className="text-center equal-width">Value</th>
            <th className="text-center equal-width">No.of Quotation Received</th>
            <th className="text-center equal-width">Suppliers</th>
          </tr>
        </thead>
        <tbody>
          {/* Rows will be added here when data is available */}
        </tbody>
      </Table>
    </div>
  </div>  
  );
};

export default ViewProcurementCommittee;