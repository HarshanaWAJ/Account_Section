import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axiosInstance from '../axiosInstance'; // Import the custom axios instance
import Sidebar from './SidebarClerk';

const ViewQuotationCall = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await axiosInstance.get('/api/quotations/get-all-quotations');
        setQuotations(response.data); 
        console.log(response.data);
        
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching quotations');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotations();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-4">
        <h2 className="text-center mb-4">Quotation Call</h2>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        {!loading && !error && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="text-center equal-width">QC No.</th>
                <th className="text-center equal-width">Demand No.</th>
                <th className="text-center equal-width">QC Date</th>
                <th className="text-center equal-width">Opening Date</th>
              </tr>
            </thead>
            <tbody>
              {quotations.map((quotation) => (
                <tr key={quotation.qcNo}>
                  <td className="text-center">{quotation.qcNo}</td>
                  <td className="text-center">{quotation.demand.demandNo}</td>
                  <td className="text-center">{quotation.qcDate}</td>
                  <td className="text-center">{quotation.openingDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ViewQuotationCall;
