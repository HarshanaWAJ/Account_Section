import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axiosInstance from '../axiosInstance'; // Import the custom axios instance
import Sidebar from './SidebarClerk';

const ViewPurchaseOrder = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]); // State to store Purchase Order data
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State for error handling

  // Fetch Purchase Order details from the API
  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await axiosInstance.get('/api/purchase-order/get/all-list');
        setPurchaseOrders(response.data);
        console.log(response.data); // Set the fetched data to state
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching Purchase Orders');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPurchaseOrders();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-4">
        <h2 className="text-center mb-4">Purchase Orders</h2>
        
        {/* Display loading or error */}
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {/* Display table with fetched Purchase Order data */}
        {!loading && !error && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="text-center equal-width">PO Reference</th>
                <th className="text-center equal-width">QC No.</th>
                <th className="text-center equal-width">PO Date</th>
                <th className="text-center equal-width">PO Value</th>
                <th className="text-center equal-width">Supplier</th>
                <th className="text-center equal-width">Delivery Date</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">No Purchase Orders Available</td>
                </tr>
              ) : (
                purchaseOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="text-center">{order.poRef}</td>
                    <td className="text-center">{order.qcNo}</td>
                    <td className="text-center">{new Date(order.poDate).toLocaleDateString()}</td>
                    <td className="text-center">
                      {order.poValue != null ? order.poValue.toFixed(2) : 'N/A'}
                    </td>

                    <td className="text-center">{order.supplier}</td>
                    <td className="text-center">{new Date(order.delivaryDate).toLocaleDateString()}</td>
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

export default ViewPurchaseOrder;
