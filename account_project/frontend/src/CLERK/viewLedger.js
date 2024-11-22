import React from 'react';
import { Table } from 'react-bootstrap';
import Sidebar from './SidebarClerk';

const ViewLedger = () => {
  return (
    <div className="d-flex">
        <Sidebar />
    <div className="container my-4">
      <h2 className="text-center mb-4">Ledger And Payment</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-center equal-width">G35 No.</th>
            <th className="text-center equal-width">Date</th>
            <th className="text-center equal-width">Vote No.</th>
            <th className="text-center equal-width">QCI No.</th>
            <th className="text-center equal-width">Invoice No.</th>
            <th className="text-center equal-width">Value</th>
            <th className="text-center equal-width">Remaining Balance</th>
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

export default ViewLedger;