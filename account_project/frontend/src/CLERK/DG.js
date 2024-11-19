import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/dg.css'; // Import the custom CSS
import axiosInstance from '../axiosInstance';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const DG = () => {
  const navigate = useNavigate();
  const [qcNo, setQcNo] = useState('');
  const [approvalLetterDate, setApprovalLetterDate] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [value, setValue] = useState('');
  const [noOfQuotationReceived, setNoOfQuotationReceived] = useState();
  const [approvedDate, setApprovedDate] = useState('');
  const [quotationCallId, setQuotationCallId] = useState(''); 
  const [suppliers, setSuppliers] = useState([{ supplierName: '', items: [] }]);
  const [currentItem, setCurrentItem] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState('');
  const [error, setError] = useState('');

  //Debugging
  console.log("Recieved Number of Quotations: ", noOfQuotationReceived);
  
  

  // Fetch the Quotation Call ID when QC Number changes
  const fetchQCNumberDetails = async (qcNo) => {
    try {
      const response = await axiosInstance.get(`/api/quotations/get-by-qc-no/${qcNo}`);
      const qcDetails = response.data;
      console.log("Quotation Call Id:", qcDetails.id);
      
      if (qcDetails) {
        if (qcDetails.exists) {
          setError('QC Number already exists. Please enter a different QC Number.');
          
        } else {
          setError('QC Number is available.');
          setQuotationCallId(qcDetails.id);
        }
      } else {
        setError('QC Number not found.');
        setQuotationCallId(''); // Reset if QC number is not found
      }
    } catch (err) {
      console.error('Error fetching QC number details:', err);
      setError('Error fetching QC number details. Please try again.');
      setQuotationCallId(''); // Reset if there's an error
    }
  };

  // Call Fetch Quotation Details
  const handleQcNoChange = async (e) => {
    const value = e.target.value;
    setQcNo(value);
    if (value) {
      await fetchQCNumberDetails(value);
    }
  };

  // Function for submit data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare procurement data
    const procurementData = {
        qcNo,
        approvalLetterDate,
        reference: referenceNo,
        value,
        noOfQuotationReceived,  
        approvedBy: 'DG',
        approvedDate,
        status: 'approved',
        quotationCallId: quotationCallId,
        quotationCall: {id: quotationCallId}
    };


    let procurementId;
    

    try {
        // Submit procurement data to create procurement
        const procurementResponse = await axiosInstance.post('/api/procurements-dg/add', procurementData);

        if (procurementResponse.status === 201) {
            procurementId = procurementResponse.data.id;

            // Track created suppliers and their IDs for rollback
            const createdSuppliers = [];

            try {
              // Collect the supplier data into an array to send in one request
              const suppliersData = suppliers.map(supplier => ({
                  supplierName: supplier.supplierName,
                  procurementByDg: { id: procurementId },
              }));
          
              // Send the array of suppliers to the backend
              const supplierResponse = await axiosInstance.post('/api/suppliers/add-supplier', suppliersData);
          
              // Assuming the response contains an array of supplier objects with their IDs
              const supplierIds = supplierResponse.data.map(supplier => supplier.id);
          
              // Now for each supplier, send their items in parallel
              await Promise.all(suppliers.map(async (supplier, index) => {
                  const supplierId = supplierIds[index]; // Get the corresponding supplier ID from the response
          
                  // Prepare and insert items for this supplier
                  await Promise.all(supplier.items.map(async (item) => {
                      await axiosInstance.post('/api/supplier-items/add-supplier-items', {
                          name: item.name,
                          quantity: item.quantity,
                          supplier: { id: supplierId },
                      });
                  }));
              }));

                // Success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data submitted successfully!',
                }).then(() => {
                    navigate('/clerk-dashboard');
                });

            } catch (supplierError) {
                console.error('Error adding suppliers or items:', supplierError);

                // Rollback: Delete created suppliers and the procurement if something fails
                await axiosInstance.delete(`/api/procurements-dg/delete-by-id/${procurementId}`);

                await Promise.all(createdSuppliers.map(async (id) => {
                    await axiosInstance.delete(`/api/suppliers/delete-by-id/${id}`);
                }));
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add suppliers or items. Data has been rolled back.',
                });
            }
        }
    } catch (procurementError) {
        console.error('Error submitting procurement data:', procurementError);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to submit procurement data. Please try again.',
        });
    }
};


  const addSupplier = () => {
    setSuppliers([...suppliers, { supplierName: '', items: [] }]);
  };

  const updateSupplier = (index, field, value) => {
    const newSuppliers = [...suppliers];
    newSuppliers[index][field] = value;
    setSuppliers(newSuppliers);
  };

  const addItem = (index) => {
    if (currentItem.trim() !== '' && currentQuantity > 0) {
      const newSuppliers = [...suppliers];
      newSuppliers[index].items.push({ name: currentItem, quantity: parseInt(currentQuantity) });
      setSuppliers(newSuppliers);
      setCurrentItem('');
      setCurrentQuantity(1);
    }
  };

  const removeItem = (supplierIndex, itemIndex) => {
    const newSuppliers = [...suppliers];
    newSuppliers[supplierIndex].items.splice(itemIndex, 1);
    setSuppliers(newSuppliers);
  };

  const removeSupplier = (index) => {
    const newSuppliers = suppliers.filter((_, i) => i !== index);
    setSuppliers(newSuppliers);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg card002">
        <div className="card-header bg-primary text-white">
          <h3>DG Form</h3>
        </div>
        <div className="card-body">
          {error && (
            <div className={`alert ${error.includes('QC Number is available.') ? 'alert-success' : 'alert-danger'}`}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">QC Number</label>
              <input
                type="text"
                className="form-control"
                value={qcNo}
                onChange={handleQcNoChange}
                required
                placeholder="QC Number"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Approval Letter Date</label>
              <input
                type="date"
                className="form-control"
                value={approvalLetterDate}
                onChange={(e) => setApprovalLetterDate(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Reference Number</label>
              <input
                type="text"
                className="form-control"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
                required
                placeholder="Reference Number"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Value</label>
              <input
                type="number"
                className="form-control"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
                placeholder="Value"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">No. of Quotation Received</label>
              <input
                type="number"
                className="form-control"
                value={noOfQuotationReceived}
                onChange={(e) => setNoOfQuotationReceived(parseInt(e.target.value))}
                required
                placeholder="No. of Quotation Received"
              />

            </div>

            <div className="mb-3">
              <label className="form-label">Approved Date</label>
              <input
                type="date"
                className="form-control"
                value={approvedDate}
                onChange={(e) => setApprovedDate(e.target.value)}
                required
              />
            </div>

            <h4 className="text-secondary">Suppliers</h4>
            {suppliers.map((supplier, supplierIndex) => (
              <div key={supplierIndex} className="mb-3 border p-3 rounded bg-light">
                <label className="form-label">Supplier's Name</label>
                <div className="d-flex align-items-center mb-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Supplier Name"
                    value={supplier.supplierName}
                    onChange={(e) => updateSupplier(supplierIndex, 'supplierName', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeSupplier(supplierIndex)}
                  >
                    Remove
                  </button>
                </div>

                <div className="mb-2">
                  <label className="form-label">Items List</label>
                  <div className="d-flex align-items-center mb-2">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Item"
                      value={currentItem}
                      onChange={(e) => setCurrentItem(e.target.value)}
                    />
                    <input
                      type="number"
                      className="form-control me-2"
                      placeholder="Quantity"
                      value={currentQuantity}
                      onChange={(e) => setCurrentQuantity(e.target.value)}
                      min="1"
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => addItem(supplierIndex)}
                    >
                      Add
                    </button>
                  </div>

                  {/* Table for items */}
                  <div className="card mb-2">
                    <div className="card-body">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {supplier.items.map((item, itemIndex) => (
                            <tr key={itemIndex}>
                              <td>{item.name}</td>
                              <td>{item.quantity}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={() => removeItem(supplierIndex, itemIndex)}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button type="button" className="btn btn-primary mb-3" onClick={addSupplier}>
              Add Supplier
            </button>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-success w-100">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DG;
