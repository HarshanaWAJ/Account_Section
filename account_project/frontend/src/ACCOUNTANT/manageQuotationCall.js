import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Sidebar from './SidebarAccountant';
import axiosInstance from '../axiosInstance'; // Import the custom axios instance

const ManageQuotationCall = () => {
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

  // Update handler
  const handleUpdate = (qcNo) => {
    alert(`Update QC No. ${qcNo}`);
    // Add your update logic here
  };

  // Delete handler
  const handleDelete = async (qcNo) => {
    if (window.confirm(`Are you sure you want to delete QC No. ${qcNo}?`)) {
      try {
        await axiosInstance.delete(`/api/quotations/${qcNo}`); // Adjust API endpoint as needed
        setQuotations((prevQuotations) =>
          prevQuotations.filter((quotation) => quotation.qcNo !== qcNo)
        );
        alert(`QC No. ${qcNo} deleted successfully`);
      } catch (err) {
        alert(err.response?.data?.message || err.message || 'Error deleting QC');
      }
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-4">
        <h2 className="text-center mb-4">Manage Quotation Call</h2>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        {!loading && !error && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="text-center equal-width">QC No.</th>
                <th className="text-center equal-width">QC Date</th>
                <th className="text-center equal-width">Opening Date</th>
                <th className="text-center equal-width">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotations.map((quotation) => (
                <tr key={quotation.qcNo}>
                  <td className="text-center">{quotation.qcNo}</td>
                  <td className="text-center">{quotation.qcDate}</td>
                  <td className="text-center">{quotation.openingDate}</td>
                  <td className="text-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleUpdate(quotation.qcNo)}
                    >
                      Update
                    </Button>{' '}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(quotation.qcNo)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ManageQuotationCall;
