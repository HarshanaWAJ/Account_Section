import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axiosInstance from '../axiosInstance'; // Import the custom axios instance
import Sidebar from './SidebarAccountant';

const ManageLedger = () => {
  const [ledgerData, setLedgerData] = useState([]); // State to store Ledger data
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State for error handling

  // Fetch Ledger and Payment details from the API
  useEffect(() => {
    const fetchLedgerData = async () => {
      try {
        const response = await axiosInstance.get('/api/ledgers/get-all-list');
        setLedgerData(response.data); // Set the fetched data to state
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching Ledger data');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchLedgerData();
  }, []);

  // Handler for Update action
  const handleUpdate = (g35No) => {
    // Logic to handle the update (you could navigate to an update page or show a modal)
    console.log(`Update record with G35 No: ${g35No}`);
  };

  // Handler for Delete action
  const handleDelete = async (g35No) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this record?');
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/api/ledgers/${g35No}`);
        setLedgerData(ledgerData.filter(ledger => ledger.g35No !== g35No)); // Remove deleted item from state
        alert('Ledger record deleted successfully');
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error deleting Ledger data');
      }
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-4">
        <h2 className="text-center mb-4">Ledger And Payment</h2>
        
        {/* Display loading or error */}
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {/* Display table with fetched Ledger data */}
        {!loading && !error && (
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
                <th className="text-center equal-width">Actions</th> {/* New Actions Column */}
              </tr>
            </thead>
            <tbody>
              {ledgerData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">No Ledger Data Available</td>
                </tr>
              ) : (
                ledgerData.map((ledger) => (
                  <tr key={ledger.g35No}>
                    <td className="text-center">{ledger.g35No}</td>
                    <td className="text-center">{ledger.date}</td>
                    <td className="text-center">{ledger.voteNo}</td>
                    <td className="text-center">{ledger.qciNo}</td>
                    <td className="text-center">{ledger.invoiceNo}</td>
                    <td className="text-center">{ledger.value}</td>
                    <td className="text-center">{ledger.remainingBalance}</td>
                    <td className="text-center">
                      {/* Action buttons */}
                      <Button 
                        variant="warning" 
                        size="sm" 
                        className="mr-2" 
                        onClick={() => handleUpdate(ledger.g35No)}>
                        Update
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => handleDelete(ledger.g35No)}>
                        Delete
                      </Button>
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

export default ManageLedger;
