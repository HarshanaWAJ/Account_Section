import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axiosInstance from '../axiosInstance'; // Import the custom axios instance
import Sidebar from './SidebarClerk';

const ViewAdvanceAdhoc = () => {
  const [advanceAdhocData, setAdvanceAdhocData] = useState([]); // State to store Advance/Adhoc Request data
  const [advanceReceivedData, setAdvanceReceivedData] = useState([]); // State for Advance Received data
  const [advanceSettlementData, setAdvanceSettlementData] = useState([]); // State for Advance Settlement data
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State for error handling

  // Fetch Advance/Adhoc Request details from the API
  useEffect(() => {
    const fetchAdvanceAdhocData = async () => {
      try {
        const response = await axiosInstance.get('/api/cash-advance/get-all-cash-advance');
        setAdvanceAdhocData(response.data); // Set the fetched data to state
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching Advance/Adhoc Request data');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchAdvanceAdhocData();
  }, []);

  // Fetch Advance Received details from the API
  useEffect(() => {
    const fetchAdvanceReceivedData = async () => {
      try {
        const response = await axiosInstance.get('/api/advance-received/get-all-cash-advance');
        setAdvanceReceivedData(response.data); // Set the fetched data to state
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching Advance Received data');
      }
    };

    fetchAdvanceReceivedData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Fetch Advance Settlement details from the API
  useEffect(() => {
    const fetchAdvanceSettlementData = async () => {
      try {
        const response = await axiosInstance.get('/api/advance-settlement/get-all-cash-advance');
        setAdvanceSettlementData(response.data); // Set the fetched data to state
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching Advance Settlement data');
      }
    };

    fetchAdvanceSettlementData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-4">
        <h2 className="text-center mb-4">Cash Advance / Adhoc</h2>
        <h2 className="text-center mb-4">Advance/Adhoc Request</h2>
        
        {/* Display loading or error */}
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        
        {/* Display table with fetched Advance/Adhoc Request data */}
        {!loading && !error && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="text-center equal-width">Serial No.</th>
                <th className="text-center equal-width">Wing</th>
                <th className="text-center equal-width">Project No.</th>
                <th className="text-center equal-width">Vote No.</th>
                <th className="text-center equal-width">Amount</th>
                <th className="text-center equal-width">Reason</th>
                <th className="text-center equal-width">MOD Sending Date</th>
                <th className="text-center equal-width">Status</th>
              </tr>
            </thead>
            <tbody>
              {advanceAdhocData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">No Advance/Adhoc Requests Available</td>
                </tr>
              ) : (
                advanceAdhocData.map((request) => (
                  <tr key={request.serialNo}>
                    <td className="text-center">{request.serialNo}</td>
                    <td className="text-center">{request.wing}</td>
                    <td className="text-center">{request.projectNo}</td>
                    <td className="text-center">{request.voteNo}</td>
                    <td className="text-center">{request.amount}</td>
                    <td className="text-center">{request.reason}</td>
                    <td className="text-center">{request.modSendingDate}</td>
                    <td className="text-center">{request.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}

        <h2 className="text-center mb-4">Advance Received</h2>
        {/* Display table with fetched Advance Received data */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-center equal-width">Serial No.</th>
              <th className="text-center equal-width">Wing or Vote</th>
              <th className="text-center equal-width">Project or Vote</th>
              <th className="text-center equal-width">Amount</th>
              <th className="text-center equal-width">Received Date</th>
            </tr>
          </thead>
          <tbody>
            {advanceReceivedData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No Advance Received Data Available</td>
              </tr>
            ) : (
              advanceReceivedData.map((received) => (
                <tr key={received.serialNo}>
                  <td className="text-center">{received.serialNo}</td>
                  <td className="text-center">{received.wingOrVote}</td>
                  <td className="text-center">{received.projectOrVote}</td>
                  <td className="text-center">{received.amount}</td>
                  <td className="text-center">{received.receivedDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <h2 className="text-center mb-4">Advance Settlement</h2>
        {/* Display table with fetched Advance Settlement data */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-center equal-width">Serial No.</th>
              <th className="text-center equal-width">Wing or Vote</th>
              <th className="text-center equal-width">Project or Vote</th>
              <th className="text-center equal-width">Amount</th>
              <th className="text-center equal-width">Settle Date</th>
            </tr>
          </thead>
          <tbody>
            {advanceSettlementData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No Advance Settlement Data Available</td>
              </tr>
            ) : (
              advanceSettlementData.map((settlement) => (
                <tr key={settlement.serialNo}>
                  <td className="text-center">{settlement.serialNo}</td>
                  <td className="text-center">{settlement.wingOrVote}</td>
                  <td className="text-center">{settlement.projectOrVote}</td>
                  <td className="text-center">{settlement.amount}</td>
                  <td className="text-center">{settlement.settleDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>  
  );
};

export default ViewAdvanceAdhoc;
