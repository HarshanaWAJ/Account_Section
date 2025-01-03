import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axiosInstance from '../axiosInstance'; // Import the custom axios instance
import Sidebar from './SidebarClerk';

const ViewLedger = () => {
  const [ledgerData, setLedgerData] = useState([]); // State to store Ledger data
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State for error handling

  // Fetch Ledger and Payment details from the API
  useEffect(() => {
    const fetchLedgerData = async () => {
      try {
        const response = await axiosInstance.get('/api/ledgers/get-all-list');
        console.log(response.data);
        
        setLedgerData(response.data); // Set the fetched data to state
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching Ledger data');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchLedgerData();
  }, []);

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
              </tr>
            </thead>
            <tbody>
              {ledgerData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">No Ledger Data Available</td>
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
                    <td className="text-center">{ledger.remainBalance}</td>
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

export default ViewLedger;
