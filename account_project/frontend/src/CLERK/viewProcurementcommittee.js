import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axiosInstance from '../axiosInstance'; // Import the custom axios instance
import Sidebar from './SidebarClerk';

const ViewProcurementCommittee = () => {
  const [dgDetails, setDgDetails] = useState([]);
  const [rpcDetails, setRpcDetails] = useState([]); // State for RPC details
  const [mpcDetails, setMpcDetails] = useState([]); // State for MPC details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              </tr>
            </thead>
            <tbody>
              {dgDetails.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">Data are not available</td>
                </tr>
              ) : (
                dgDetails.map((dg) => (
                  <tr key={dg.referenceNo}>
                    <td className="text-center">{dg.referenceNo}</td>
                    <td className="text-center">{dg.approvalLetterDate}</td>
                    <td className="text-center">{dg.value}</td>
                    <td className="text-center">{dg.noOfQuotationReceived}</td>
                    <td className="text-center">{dg.suppliers.join(', ')}</td>
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
              </tr>
            </thead>
            <tbody>
              {rpcDetails.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">Data are not available</td>
                </tr>
              ) : (
                rpcDetails.map((rpc) => (
                  <tr key={rpc.referenceNo}>
                    <td className="text-center">{rpc.referenceNo}</td>
                    <td className="text-center">{rpc.sendDate}</td>
                    <td className="text-center">{rpc.approvedDate}</td>
                    <td className="text-center">{rpc.value}</td>
                    <td className="text-center">{rpc.noOfQuotationReceived}</td>
                    <td className="text-center">{rpc.suppliers.join(', ')}</td>
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
              </tr>
            </thead>
            <tbody>
              {mpcDetails.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">Data are not available</td>
                </tr>
              ) : (
                mpcDetails.map((mpc) => (
                  <tr key={mpc.referenceNo}>
                    <td className="text-center">{mpc.referenceNo}</td>
                    <td className="text-center">{mpc.sendDate}</td>
                    <td className="text-center">{mpc.approvedDate}</td>
                    <td className="text-center">{mpc.value}</td>
                    <td className="text-center">{mpc.noOfQuotationReceived}</td>
                    <td className="text-center">{mpc.suppliers.join(', ')}</td>
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

export default ViewProcurementCommittee;