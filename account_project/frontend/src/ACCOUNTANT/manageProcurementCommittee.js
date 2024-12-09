import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axiosInstance from '../axiosInstance'; // Import the custom axios instance
import Sidebar from './SidebarAccountant';

const ManageProcurementCommittee = () => {
  const [dgDetails, setDgDetails] = useState([]);
  const [rpcDetails, setRpcDetails] = useState([]); // State for RPC details
  const [mpcDetails, setMpcDetails] = useState([]); // State for MPC details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to format date as "MM/DD/YYYY"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date to show only the date part
  };

  // Fetch DG data from the API
  useEffect(() => {
    const fetchDgDetails = async () => {
      try {
        const response = await axiosInstance.get('/api/procurements-dg/get-all');
        setDgDetails(response.data); // Set fetched DG data
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching DG details');
      } finally {
        setLoading(false);
      }
    };

    fetchDgDetails();
  }, []);

  // Fetch RPC data from the API
  useEffect(() => {
    const fetchRpcDetails = async () => {
      try {
        const response = await axiosInstance.get('/api/procurement_rpc/get-all');
        setRpcDetails(response.data); // Set fetched RPC data
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching RPC details');
      }
    };

    fetchRpcDetails();
  }, []);

  // Fetch MPC data from the API
  useEffect(() => {
    const fetchMpcDetails = async () => {
      try {
        const response = await axiosInstance.get('/api/procurement-mpc/get-all');
        setMpcDetails(response.data); // Set fetched MPC data
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching MPC details');
      }
    };

    fetchMpcDetails();
  }, []);

  // Handle Update action
  const handleUpdate = (referenceNo) => {
    console.log('Update clicked for reference:', referenceNo);
    // You can implement the logic to open an update form or modal for the specific entry
  };

  // Handle Delete action
  const handleDelete = async (referenceNo) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/api/procurements-dg/delete/${referenceNo}`);
        setDgDetails(dgDetails.filter((dg) => dg.referenceNo !== referenceNo));
        alert('DG record deleted successfully');
      } catch (err) {
        alert('Error deleting record');
      }
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-4">
        <h2 className="text-center mb-4">Procurement Committee</h2>
        
        {/* DG Table */}
        <h2 className="text-center mb-4">DG</h2>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        {!loading && !error && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="text-center equal-width">Reference No.</th>
                <th className="text-center equal-width">Approval Letter Date</th>
                <th className="text-center equal-width">Value</th>
                <th className="text-center equal-width">No. of Quotation Received</th>
                <th className="text-center equal-width">Suppliers</th>
                <th className="text-center equal-width">Actions</th> {/* Actions column */}
              </tr>
            </thead>
            <tbody>
              {dgDetails.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">Data are not available</td>
                </tr>
              ) : (
                dgDetails.map((dg) => (
                  <tr key={dg.referenceNo}>
                    <td className="text-center">{dg.referenceNo}</td>
                    <td className="text-center">{formatDate(dg.approvalLetterDate)}</td> {/* Format date */}
                    <td className="text-center">{dg.value}</td>
                    <td className="text-center">{dg.noOfQuotationReceived}</td>
                    <td className="text-center">{dg.suppliers.join(', ')}</td>
                    <td className="text-center">
                      <Button variant="primary" onClick={() => handleUpdate(dg.referenceNo)}>Update</Button>
                      <Button variant="danger" onClick={() => handleDelete(dg.referenceNo)} className="ms-2">Delete</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}

        {/* RPC Table */}
        <h2 className="text-center mb-4">RPC</h2>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        {!loading && !error && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="text-center equal-width">Reference No.</th>
                <th className="text-center equal-width">Send Date</th>
                <th className="text-center equal-width">Approved Date</th>
                <th className="text-center equal-width">Value</th>
                <th className="text-center equal-width">No. of Quotation Received</th>
                <th className="text-center equal-width">Suppliers</th>
                <th className="text-center equal-width">Actions</th> {/* Actions column */}
              </tr>
            </thead>
            <tbody>
              {rpcDetails.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">Data are not available</td>
                </tr>
              ) : (
                rpcDetails.map((rpc) => (
                  <tr key={rpc.referenceNo}>
                    <td className="text-center">{rpc.referenceNo}</td>
                    <td className="text-center">{formatDate(rpc.sendDate)}</td> {/* Format date */}
                    <td className="text-center">{formatDate(rpc.approvedDate)}</td> {/* Format date */}
                    <td className="text-center">{rpc.value}</td>
                    <td className="text-center">{rpc.noOfQuotationReceived}</td>
                    <td className="text-center">{rpc.suppliers.join(', ')}</td>
                    <td className="text-center">
                      <Button variant="primary" onClick={() => handleUpdate(rpc.referenceNo)}>Update</Button>
                      <Button variant="danger" onClick={() => handleDelete(rpc.referenceNo)} className="ms-2">Delete</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}

        {/* MPC Table */}
        <h2 className="text-center mb-4">MPC</h2>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        {!loading && !error && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="text-center equal-width">Reference No.</th>
                <th className="text-center equal-width">Send Date</th>
                <th className="text-center equal-width">Approved Date</th>
                <th className="text-center equal-width">Value</th>
                <th className="text-center equal-width">No. of Quotation Received</th>
                <th className="text-center equal-width">Suppliers</th>
                <th className="text-center equal-width">Actions</th> {/* Actions column */}
              </tr>
            </thead>
            <tbody>
              {mpcDetails.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">Data are not available</td>
                </tr>
              ) : (
                mpcDetails.map((mpc) => (
                  <tr key={mpc.referenceNo}>
                    <td className="text-center">{mpc.referenceNo}</td>
                    <td className="text-center">{formatDate(mpc.sendDate)}</td> {/* Format date */}
                    <td className="text-center">{formatDate(mpc.approvedDate)}</td> {/* Format date */}
                    <td className="text-center">{mpc.value}</td>
                    <td className="text-center">{mpc.noOfQuotationReceived}</td>
                    <td className="text-center">{mpc.suppliers.join(', ')}</td>
                    <td className="text-center">
                      <Button variant="primary" onClick={() => handleUpdate(mpc.referenceNo)}>Update</Button>
                      <Button variant="danger" onClick={() => handleDelete(mpc.referenceNo)} className="ms-2">Delete</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ManageProcurementCommittee;
