import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axiosInstance from '../axiosInstance'; // Import the custom axios instance
import Sidebar from './SidebarAccountant';

const ViewAdvanceAdhoc = () => {
  const [advanceAdhocData, setAdvanceAdhocData] = useState([]); // State to store Advance/Adhoc Request data
  const [advanceReceivedData, setAdvanceReceivedData] = useState([]); // State for Advance Received data
  const [advanceSettlementData, setAdvanceSettlementData] = useState([]); // State for Advance Settlement data
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State for error handling

  // Fetch Advance/Adhoc Request details from the API
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

  // Fetch Advance Received details from the API
  const fetchAdvanceReceivedData = async () => {
    try {
      const response = await axiosInstance.get('/api/advance-received/get-all-cash-advance');
      setAdvanceReceivedData(response.data); // Set the fetched data to state
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error fetching Advance Received data');
    }
  };

  // Fetch Advance Settlement details from the API
  const fetchAdvanceSettlementData = async () => {
    try {
      const response = await axiosInstance.get('/api/advance-settlement/get-all-cash-advance');
      setAdvanceSettlementData(response.data); // Set the fetched data to state
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error fetching Advance Settlement data');
    }
  };

  // Fetch all data on initial load
  useEffect(() => {
    fetchAdvanceAdhocData();
    fetchAdvanceReceivedData();
    fetchAdvanceSettlementData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Handle update and delete actions
  const handleUpdate = (id) => {
    // Implement the update functionality (e.g., navigate to an update form)
    console.log('Updating record with ID:', id);
  };

  const handleDelete = async (id, type) => {
    // Implement the delete functionality
    try {
      await axiosInstance.delete(`/api/${type}/delete/${id}`);
      alert('Record deleted successfully');
      // After deletion, fetch the data again to reflect changes
      fetchAdvanceAdhocData(); // Example: Refresh the data for Advance/Adhoc
      fetchAdvanceReceivedData();
      fetchAdvanceSettlementData();
    } catch (err) {
      console.error('Error deleting record:', err);
      alert('Error deleting record');
    }
  };

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
                <th className="text-center equal-width">Actions</th> {/* New Actions column */}
              </tr>
            </thead>
            <tbody>
              {advanceAdhocData.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">No Advance/Adhoc Requests Available</td>
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
                    <td className="text-center">
                      <Button variant="primary" onClick={() => handleUpdate(request.serialNo)}>Update</Button>
                      <Button variant="danger" onClick={() => handleDelete(request.serialNo, 'cash-advance')}>Delete</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}

        {/* Repeat similar process for Advance Received and Advance Settlement */}
        <h2 className="text-center mb-4">Advance Received</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-center equal-width">Serial No.</th>
              <th className="text-center equal-width">Wing or Vote</th>
              <th className="text-center equal-width">Project or Vote</th>
              <th className="text-center equal-width">Amount</th>
              <th className="text-center equal-width">Received Date</th>
              <th className="text-center equal-width">Actions</th> {/* New Actions column */}
            </tr>
          </thead>
          <tbody>
            {advanceReceivedData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No Advance Received Data Available</td>
              </tr>
            ) : (
              advanceReceivedData.map((received) => (
                <tr key={received.serialNo}>
                  <td className="text-center">{received.serialNo}</td>
                  <td className="text-center">{received.wingOrVote}</td>
                  <td className="text-center">{received.projectOrVote}</td>
                  <td className="text-center">{received.amount}</td>
                  <td className="text-center">{received.receivedDate}</td>
                  <td className="text-center">
                    <Button variant="primary" onClick={() => handleUpdate(received.serialNo)}>Update</Button>
                    <Button variant="danger" onClick={() => handleDelete(received.serialNo, 'advance-received')}>Delete</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <h2 className="text-center mb-4">Advance Settlement</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-center equal-width">Serial No.</th>
              <th className="text-center equal-width">Wing or Vote</th>
              <th className="text-center equal-width">Project or Vote</th>
              <th className="text-center equal-width">Amount</th>
              <th className="text-center equal-width">Settle Date</th>
              <th className="text-center equal-width">Actions</th> {/* New Actions column */}
            </tr>
          </thead>
          <tbody>
            {advanceSettlementData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No Advance Settlement Data Available</td>
              </tr>
            ) : (
              advanceSettlementData.map((settlement) => (
                <tr key={settlement.serialNo}>
                  <td className="text-center">{settlement.serialNo}</td>
                  <td className="text-center">{settlement.wingOrVote}</td>
                  <td className="text-center">{settlement.projectOrVote}</td>
                  <td className="text-center">{settlement.amount}</td>
                  <td className="text-center">{settlement.settleDate}</td>
                  <td className="text-center">
                    <Button variant="primary" onClick={() => handleUpdate(settlement.serialNo)}>Update</Button>
                    <Button variant="danger" onClick={() => handleDelete(settlement.serialNo, 'advance-settlement')}>Delete</Button>
                  </td>
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
