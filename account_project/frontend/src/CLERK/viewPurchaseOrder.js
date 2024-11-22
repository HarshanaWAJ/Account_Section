import React from 'react';
import { Table } from 'react-bootstrap';
import Sidebar from './SidebarClerk';

const ViewPurchaseOrder = () => {
  return (
    <div className="d-flex">
        <Sidebar />
    <div className="container my-4">
      <h2 className="text-center mb-4">Purchase Order Place</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-center equal-width">QC No.</th>
            <th className="text-center equal-width">PO Date</th>
            <th className="text-center equal-width">PO Value</th>
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

export default ViewPurchaseOrder;