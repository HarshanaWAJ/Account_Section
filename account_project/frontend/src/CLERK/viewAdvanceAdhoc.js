import React from 'react';
import { Table } from 'react-bootstrap';
import Sidebar from './SidebarClerk';

const ViewAdvanceAdhoc = () => {
  return (
    <div className="d-flex">
        <Sidebar />
    <div className="container my-4">
      <h2 className="text-center mb-4">Cash Advance / Ad-hoc</h2>
      <h2 className="text-center mb-4">Advance/ Ad-hoc Request</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-center equal-width">QC No.</th>
            <th className="text-center equal-width">Demand No.</th>
            <th className="text-center equal-width">QC Date</th>
            <th className="text-center equal-width">Opening Date</th>
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

export default ViewAdvanceAdhoc;