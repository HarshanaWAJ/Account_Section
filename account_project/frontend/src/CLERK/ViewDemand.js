import React from 'react';
import { Table } from 'react-bootstrap';
import './css/viewDemands.css'; // Ensure this CSS file is created and linked

const ViewDemands = () => {
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Project Demands</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-center equal-width">Project Name</th>
            <th className="text-center equal-width">Date</th>
            <th className="text-center equal-width">Wing</th>
            <th className="text-center equal-width">Estimated Value</th>
            <th className="text-center equal-width">Total Allocation per Year</th>
          </tr>
        </thead>
        <tbody>
          {/* Rows will be added here when data is available */}
        </tbody>
      </Table>

      <h2 className="text-center mb-4">Others(MT/Qstor) Demands</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-center equal-width">Section</th>
            <th className="text-center equal-width">Vote</th>
            <th className="text-center equal-width">Date</th>
            <th className="text-center equal-width">Estimated Value</th>
            <th className="text-center equal-width">Total Allocation per Year</th>
          </tr>
        </thead>
        <tbody>
          {/* Rows will be added here when data is available */}
        </tbody>
      </Table>
    </div>

    
  );
};

export default ViewDemands;
