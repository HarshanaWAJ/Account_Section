import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axiosInstance from '../axiosInstance'; // Import the custom axios instance
import Sidebar from './SidebarAccountant';

const ManagePettyCash = () => {
  const [pettyCashData, setPettyCashData] = useState([]); // State to store Petty Cash data
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State for error handling

  // Fetch Petty Cash details from the API
  useEffect(() => {
    const fetchPettyCashData = async () => {
      try {
        const response = await axiosInstance.get('/api/petty-cash/get-all');
        setPettyCashData(response.data); // Set the fetched data to state
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching Petty Cash data');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPettyCashData();
  }, []);

  // Function to handle updating a petty cash item
  const updatePettyCash = (voteNo) => {
    alert(`Update petty cash with Vote No: ${voteNo}`);
    // Implement update functionality (redirect to a form or show modal to update)
  };

  // Function to handle deleting a petty cash item
  const deletePettyCash = async (voteNo) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Petty Cash entry?');
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/api/petty-cash/${voteNo}`);
        setPettyCashData(pettyCashData.filter((cash) => cash.voteNo !== voteNo)); // Remove deleted item from state
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error deleting Petty Cash data');
      }
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-4">
        <h2 className="text-center mb-4">Manage Petty Cash</h2>
        
        {/* Display loading or error */}
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {/* Display table with fetched Petty Cash data */}
        {!loading && !error && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="text-center equal-width">Vote No.</th>
                <th className="text-center equal-width">Vote Name</th>
                <th className="text-center equal-width">Amount</th>
                <th className="text-center equal-width">Reason</th>
                <th className="text-center equal-width">Date</th>
                <th className="text-center equal-width">Actions</th> {/* New Actions column */}
              </tr>
            </thead>
            <tbody>
              {pettyCashData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">No Petty Cash Data Available</td>
                </tr>
              ) : (
                pettyCashData.map((cash) => (
                  <tr key={cash.voteNo}>
                    <td className="text-center">{cash.voteNo}</td>
                    <td className="text-center">{cash.voteName}</td>
                    <td className="text-center">{cash.amount}</td>
                    <td className="text-center">{cash.reason}</td>
                    <td className="text-center">{cash.date}</td>
                    <td className="text-center">
                      <Button variant="primary" onClick={() => updatePettyCash(cash.voteNo)} className="me-2">Update</Button>
                      <Button variant="danger" onClick={() => deletePettyCash(cash.voteNo)}>Delete</Button>
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

export default ManagePettyCash;
