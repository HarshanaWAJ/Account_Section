import React, { useState } from 'react';
import './css/rpc.css'; // Import the custom CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const RPC = () => {
  const [qcNo, setQcNo] = useState('');
  const [approvalSendDate, setApprovalSendDate] = useState(''); 
  const [approvalReceivedDate, setApprovalReceivedDate] = useState(''); 
  const [referenceNo, setReferenceNo] = useState('');
  const [value, setValue] = useState('');
  const [noOfQuotationReceived, setnoOfQuotationReceived] = useState('');
  const [suppliers, setSuppliers] = useState([{ name: '', contact: '', items: [] }]);
  const [currentItem, setCurrentItem] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ qcNo, approvalSendDate, approvalReceivedDate, referenceNo, value, noOfQuotationReceived, suppliers });
  };

  // Add a new supplier row
  const addSupplier = () => {
    setSuppliers([...suppliers, { name: '', contact: '', items: [] }]);
  };

  // Update supplier data
  const updateSupplier = (index, field, value) => {
    const newSuppliers = [...suppliers];
    newSuppliers[index][field] = value;
    setSuppliers(newSuppliers);
  };

  // Remove a supplier row
  const removeSupplier = (index) => {
    const newSuppliers = suppliers.filter((_, i) => i !== index);
    setSuppliers(newSuppliers);
  };

  // Add item to the items list of a supplier
  const addItem = (index) => {
    if (currentItem.trim() !== '' && currentQuantity > 0) {
      const newSuppliers = [...suppliers];
      newSuppliers[index].items.push({ name: currentItem, quantity: currentQuantity });
      setSuppliers(newSuppliers);
      setCurrentItem(''); // Clear the item input after adding
      setCurrentQuantity(''); // Clear the quantity input after adding
    }
  };

  // Remove item from the items list of a supplier
  const removeItem = (supplierIndex, itemIndex) => {
    const newSuppliers = [...suppliers];
    newSuppliers[supplierIndex].items.splice(itemIndex, 1);
    setSuppliers(newSuppliers);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg card002">
        <div className="card-header bg-primary text-white">
          <h3>RPC Form</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">QC Number</label>
              <input
                type="text"
                className="form-control"
                value={qcNo}
                onChange={(e) => setQcNo(e.target.value)}
                required
                placeholder="QC Number"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Approval Send Date</label>
              <input
                type="date"
                className="form-control"
                value={approvalSendDate}
                onChange={(e) => setApprovalSendDate(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Approval Received Date</label>
              <input
                type="date"
                className="form-control"
                value={approvalReceivedDate}
                onChange={(e) => setApprovalReceivedDate(e.target.value)}
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
                onChange={(e) => setnoOfQuotationReceived(e.target.value)}
                required
                placeholder="No. of Quotation Received"
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
                    value={supplier.name}
                    onChange={(e) => updateSupplier(supplierIndex, 'name', e.target.value)}
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
                      required
                    />
                    <input
                      type="number"
                      className="form-control me-2"
                      placeholder="Quantity"
                      value={currentQuantity}
                      onChange={(e) => setCurrentQuantity(e.target.value)}
                      min="1"
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => addItem(supplierIndex)}
                    >
                      Add
                    </button>
                  </div>

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

export default RPC;
