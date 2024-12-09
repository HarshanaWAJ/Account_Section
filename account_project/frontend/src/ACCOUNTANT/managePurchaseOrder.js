import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axiosInstance from '../axiosInstance'; // Import the custom axios instance
import Sidebar from './SidebarAccountant';

const ManagePurchaseOrder = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]); // State to store Purchase Order data
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State for error handling

  // Fetch Purchase Order details from the API
  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await axiosInstance.get('/api/purchase-order/get/all-list');
        setPurchaseOrders(response.data); // Set the fetched data to state
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching Purchase Orders');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPurchaseOrders();
  }, []);

  // Handle Update action
  const handleUpdate = (qcNo) => {
    // Navigate to the update page or open a modal for updating
    console.log('Update PO with QC No:', qcNo);
    // For example, you can redirect to an update page like:
    // history.push(`/update-purchase-order/${qcNo}`);
  };

  // Handle Delete action
  const handleDelete = async (qcNo) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Purchase Order?');
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/api/purchase-order/delete/${qcNo}`);
        setPurchaseOrders(purchaseOrders.filter(order => order.qcNo !== qcNo)); // Remove the deleted order from state
        alert('Purchase Order deleted successfully');
      } catch (err) {
        alert('Error deleting Purchase Order: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-4">
        <h2 className="text-center mb-4">Purchase Order Place</h2>
        
        {/* Display loading or error */}
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {/* Display table with fetched Purchase Order data */}
        {!loading && !error && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="text-center equal-width">QC No.</th>
                <th className="text-center equal-width">PO Date</th>
                <th className="text-center equal-width">PO Value</th>
                <th className="text-center equal-width">Suppliers</th>
                <th className="text-center equal-width">Actions</th> {/* New Actions column */}
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">No Purchase Orders Available</td>
                </tr>
              ) : (
                purchaseOrders.map((order) => (
                  <tr key={order.qcNo}>
                    <td className="text-center">{order.qcNo}</td>
                    <td className="text-center">{order.poDate}</td>
                    <td className="text-center">{order.poValue}</td>
                    <td className="text-center">{order.suppliers.join(', ')}</td>
                    <td className="text-center">
                      <Button variant="warning" size="sm" onClick={() => handleUpdate(order.qcNo)}>
                        Update
                      </Button>
                      {' '}
                      <Button variant="danger" size="sm" onClick={() => handleDelete(order.qcNo)}>
                        Delete
                      </Button>
                    </td> {/* Update and Delete buttons */}
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

export default ManagePurchaseOrder;
