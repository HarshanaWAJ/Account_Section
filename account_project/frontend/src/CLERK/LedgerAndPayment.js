import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './css/LedgerAndPayment.css';
import Sidebar from './SidebarClerk';
import axiosInstance from '../axiosInstance';
import Swal from 'sweetalert2';

function LedgerAndPaymentForm() {
  const [formData, setFormData] = useState({
    g35No: "",
    date: "",
    poNo: "",
    invoiceNo: "",
    value: "",
    voteNo: "",
    remainBalance: "",
    qciNo: "",
    purchase_order_id: "",  // Added this to store the purchase order ID
  });

  const voteMapping = {
    'Traveling Expenses': {
      '1101': 'Domestic',
      '1102': 'Foreign',
    },
    'Supplies': {
      '1201': 'Stationery and Office Requisites',
      '1202': 'Fuel',
      '1205': 'Other',
    },
    'Maintenance Expenditure': {
      '1301': 'Vehicles',
      '1302': 'Plant and Machinery',
      '1303': 'Buildings and Structures',
    },
    'Service': {
      '1401': 'Transport',
      '1402': 'Postal and Communication',
      '1403': 'Electricity & Water',
      '1404': 'Rents and local Taxes',
      '1409': 'Other',
    },
    'Rehabilitation & Improvement of Capital Assets': {
      '2001': 'Buildings & Structures',
      '2002': 'Plant, Machinery and Equipment',
      '2003': 'Vehicles',
    },
    'Acquisition of Capital Assets': {
      '2102': 'Furniture and Office Equipment',
      '2103': 'Plant, Machinery and Equipment',
      '2104': 'Buildings and Structures',
    },
    'Capacity Building': {
      '2401': 'Staff Training',
    },
    'Other Capital Expenditure': {
      '2507': 'Research and Development',
    },
    'National center for Cyber Security': {
      '2509': 'Other',
    },
  };

  const [purchaseOrderData, setPurchaseOrderData] = useState(null); // New state to store the fetched data

  // Handle changes for both main form and sub-form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedState = { ...prevState, [name]: value };

      // If PO Value and/or Value are updated, calculate the remaining balance
      if (name === "value" || name === "poNo") {
        const poValue = purchaseOrderData ? purchaseOrderData.poValue : 0;
        const newValue = updatedState.value ? parseFloat(updatedState.value) : 0;
        updatedState.remainBalance = poValue - newValue;
      }

      return updatedState;
    });

    // Show subform when PO No is filled
    if (name === "poNo" && value !== "") {
      fetchPurchaseOrderData(value); // Fetch data when PO No is provided
    } else if (name === "poNo" && value === "") {
      setPurchaseOrderData(null); // Reset the fetched data when PO No is empty
    }
  };

  const fetchPurchaseOrderData = async (poNo) => {
    try {
      const response = await axiosInstance.get(`/api/purchase-order/get-purchase-order-by-po-no?poNo=${encodeURIComponent(poNo)}`);
      
      if (response.status === 200 && response.data && response.data.length > 0) {
        const fetchedData = response.data[0]; // Assuming the response is an array, grab the first item
        console.log('Purchase Order Data:', fetchedData);  // Log the fetched data
  
        // Update state with the fetched purchase order data and its ID
        setPurchaseOrderData(fetchedData);
  
        // If PO Value exists in the fetched data, calculate remaining balance
        const poValue = fetchedData.poValue || 0;
        const value = formData.value ? parseFloat(formData.value) : 0;
        
        // Ensure purchase_order_id is updated in the form data
        setFormData((prevState) => ({
          ...prevState,
          remainingBalance: poValue - value,
          purchase_order_id: fetchedData.id,  // Ensure 'id' is set to the purchase_order_id
        }));
      } else {
        console.error('Failed to fetch data:', response.status);
        setPurchaseOrderData(null); // Reset if no data
      }
    } catch (error) {
      console.error('Error fetching purchase order data:', error);
      setPurchaseOrderData(null); // Reset on error
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const dataToSubmit = {
      ...formData,
      purchase_order_id: formData.purchase_order_id,  // Ensure purchase_order_id is included
    };
  
    console.log('Data to Submit:', dataToSubmit); // Debug log to see if purchase_order_id is present
  
    try {
      const response = await axiosInstance.post("/api/ledgers/add", dataToSubmit);
  
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Form submitted successfully.',
        }).then(() => {
          // Redirect to clerk dashboard after success
          window.location.href = "/clerk-dashboard";  // Adjust the URL according to your routing setup
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Form submission failed. Please try again.',
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error with the form submission.',
      });
    }
  };
  
  // Flatten the voteMapping object to create options for the dropdown
  const voteOptions = Object.entries(voteMapping).flatMap(([category, votes]) =>
    Object.entries(votes).map(([voteNo, description]) => ({
      voteNo,
      description,
    }))
  );

  useEffect(() => {}, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        <div className="card shadow-lg container001">
          <div className="card-header bg-primary text-white">
            <h3>Ledger and Payment Form</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">G35 No.</label>
                  <input
                    type="text"
                    className="form-control"
                    name="g35No"
                    value={formData.g35No}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">PO No.</label>
                  <input
                    type="text"
                    className="form-control"
                    name="poNo"
                    value={formData.poNo}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Display Purchase Order Data in Table */}
              {purchaseOrderData && (
                <div className="mb-3">
                  <h5>Purchase Order Details</h5>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>S/N</th>
                        <th>PO Date</th>
                        <th>Wing</th>
                        <th>Project</th>
                        <th>Supplier</th>
                        <th>Items List</th>
                        <th>PO Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{purchaseOrderData.id || 'N/A'}</td>
                        <td>{purchaseOrderData.poDate ? new Date(purchaseOrderData.poDate).toLocaleDateString() : 'N/A'}</td>
                        <td>{purchaseOrderData.wing || 'N/A'}</td>
                        <td>{purchaseOrderData.project || 'N/A'}</td>
                        <td>{purchaseOrderData.supplier || 'N/A'}</td>
                        <td>{purchaseOrderData.items && purchaseOrderData.items.length > 0 ? purchaseOrderData.items.join(', ') : 'N/A'}</td>
                        <td>{purchaseOrderData.poValue || 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Invoice No.</label>
                  <input
                    type="text"
                    className="form-control"
                    name="invoiceNo"
                    value={formData.invoiceNo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Value</label>
                  <input
                    type="number"
                    className="form-control"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Vote No.</label>
                  <select
                    className="form-select"
                    name="voteNo"
                    value={formData.voteNo}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Vote No.</option>
                    {/* Map over the flattened vote options to create <option> elements */}
                    {voteOptions.map(({ voteNo, description }) => (
                      <option key={voteNo} value={voteNo}>
                        {voteNo} - {description}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Remaining Balance</label>
                  <input
                    type="number"
                    className="form-control"
                    name="remainingBalance"
                    value={formData.remainBalance}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">QCI No.</label>
                  <input
                    type="text"
                    className="form-control"
                    name="qciNo"
                    value={formData.qciNo}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LedgerAndPaymentForm;
