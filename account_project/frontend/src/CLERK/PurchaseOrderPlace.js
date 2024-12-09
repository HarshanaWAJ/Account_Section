import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/PurchaseOrderPlace.css'; // Import your custom CSS
import Sidebar from './SidebarClerk';
import axiosInstance from '../axiosInstance';
import Swal from 'sweetalert2';

const PurchaseOrderPlace = () => {
  const [qcNo, setQcNo] = useState('');
  const [error, setError] = useState('');
  const [quotationCallId, setQuotationCallId] = useState('');
  const [suppliers, setSuppliers] = useState([]); // List of suppliers
  const [items, setItems] = useState([]);  // List of selected items
  const [availableItems, setAvailableItems] = useState([]); // List of items per supplier (initialized as empty array)
  const [supplierId, setSupplierId] = useState(''); // Store the selected supplier's ID
  const [formData, setFormData] = useState({
    poReference: '',
    qcNumber: '',
    poDate: '',
    wing: '',
    project: '',
    poValue: '',
    supplier: '',
    items: [],
    deliveryDate: '',
  });

  const [itemQuantities, setItemQuantities] = useState({}); // Object to store item quantities

  const fetchQCNumberDetails = async (qcNo) => {
    try {
      const response = await axiosInstance.get(`/api/quotations/get-by-qc-no/${qcNo}`);
      const qcDetails = response.data;
  
      if (qcDetails) {
        if (qcDetails.exists) {
          setError('QC Number already exists. Please enter a different QC Number.');
        } else {
          setError('QC Number is available.');
          setQuotationCallId(qcDetails.id);
        }
      } else {
        setError('QC Number not found.');
        setQuotationCallId('');
      }
    } catch (err) {
      console.error('Error fetching QC number details:', err);
      setError('Error fetching QC number details. Please try again.');
      setQuotationCallId('');
    }
  };
  
  const handleQcNoChange = async (e) => {
    const value = e.target.value;
    setQcNo(value);
    if (value) {
      await fetchQCNumberDetails(value);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await axiosInstance.get('/api/suppliers/get-list');
      if (response.data.length === 0) {
        setError('No suppliers available.');
        setSuppliers([]);
      } else {
        const supplierList = response.data.map(supplier => ({
          id: supplier.id,
          name: supplier.supplierName
        }));
        setSuppliers(supplierList);
      }
    } catch (err) {
      setError('Error fetching suppliers. Please try again.');
      console.error('Error fetching suppliers:', err);
    }
  };
  

  // Fetch items for a supplier with better error handling
const handleSupplierChange = async (e) => {
  const selectedSupplier = e.target.value;
  const supplierDetails = suppliers.find(s => s.name === selectedSupplier);

  if (supplierDetails) {
    setSupplierId(supplierDetails.id);
    setFormData((prevData) => ({
      ...prevData,
      supplier: selectedSupplier,
    }));

    try {
      const response = await axiosInstance.get(`/api/supplier-items/get-supplier-items-by-supplier-id?supplierId=${supplierDetails.id}`);
      if (response.data.length === 0) {
        setAvailableItems([]); // No items available
      } else {
        setAvailableItems(response.data.filter(item => item.name && item.quantity));
      }
    } catch (err) {
      setAvailableItems([]);
      console.error('Error fetching supplier items:', err);
    }
  }
};

const handleItemChange = (e) => {
  const selectedItem = e.target.value;

  // Check if the item is already in the list of selected items
  const isItemAlreadyAdded = items.some(item => item.item === selectedItem);

  if (!isItemAlreadyAdded) {
    const initialQuantity = 1; // Default quantity set to 1
    const newItem = { item: selectedItem, quantity: initialQuantity };

    // Update both items and itemQuantities states
    setItems(prevItems => [...prevItems, newItem]);
    setItemQuantities(prevQuantities => ({
      ...prevQuantities,
      [selectedItem]: initialQuantity,
    }));
  }
};

  

  const handleQuantityChange = (e, itemName) => {
    const quantity = e.target.value;
  
    // Update the quantity in the itemQuantities state
    setItemQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemName]: quantity,
    }));
  
    // Update the quantity in the items array state
    setItems(prevItems =>
      prevItems.map(item =>
        item.item === itemName ? { ...item, quantity: quantity } : item
      )
    );
  };
  

  const handleRemoveItem = (itemToRemove) => {
    // Remove the item from both the items array and itemQuantities object
    setItems(prevItems => prevItems.filter(item => item.item !== itemToRemove));
    setItemQuantities(prevQuantities => {
      const { [itemToRemove]: _, ...rest } = prevQuantities;
      return rest;
    });
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("QC No:", qcNo);
    
    // Ensure that qcNo is part of the payload
    const payload = {
      poRef: formData.poReference,
      qcNo: qcNo,  // Ensure qcNo is included here if formData.qcNumber is empty
      poDate: formData.poDate,
      wing: formData.wing,
      project: formData.project,
      poValue: formData.poValue,
      supplier: formData.supplier,
      items: items.map(item => item.item), // Array of item names
      delivary_date: formData.deliveryDate || '',  // Correct field name and handle null
      quotationCall: {
        id: quotationCallId,  // The id of the quotation call
      },
    };
  
    try {
      // Send the request to create the purchase order
      const response = await axiosInstance.post('/api/purchase-order/add-purchase-order', payload);
  
      // Also update the demand status by qcNo
      const updateStatus = await axiosInstance.post('/api/demands/update-status-by-qc-no', { qcNo });
      console.log(updateStatus);
  
      if (response.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: 'Demand submitted successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/clerk-dashboard';
          }
        });
  
        // Reset form data after successful submission
        setFormData({
          poReference: '',
          qcNumber: '',
          poDate: '',
          wing: '',
          project: '',
          poValue: '',
          supplier: '',
          deliveryDate: '',
        });
        setQcNo(''); // Reset the QC number input
      }
    } catch (error) {
      console.error('Error creating purchase order:', error);
      alert('Error creating Purchase Order. Please try again.');
    }
  };
  
  
  

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        <div className="card shadow-lg card001">
          <div className="card-header bg-primary text-white">
            <h3 className="text">Purchase Order Place</h3>
          </div>
          <div className="card-body">
            {error && (
              <div className={`alert ${error.includes('QC Number is available.') ? 'alert-success' : 'alert-danger'}`}>
                {error}
              </div>
            )}
            <Form className="po-form" onSubmit={handleSubmit}>
              {/* PO Reference */}
              <Form.Group controlId="formPOReference" className="mb-3">
                <Form.Label className="form-label">PO Reference</Form.Label>
                <Form.Control
                  type="text"
                  name="poReference"
                  value={formData.poReference}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* QC Number */}
              <Form.Group controlId="formQCNumber" className="mb-3">
                <Form.Label className="form-label">QC Number</Form.Label>
                <Form.Control
                  type="text"
                  name="qcNumber"
                  value={formData.qcNumber || qcNo}
                  onChange={handleQcNoChange}
                  required
                />
              </Form.Group>

              {/* PO Date */}
              <Form.Group controlId="formPODate" className="mb-3">
                <Form.Label className="form-label">PO Date</Form.Label>
                <Form.Control
                  type="date"
                  name="poDate"
                  value={formData.poDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Wing */}
              <Form.Group controlId="formWing" className="mb-3">
                <Form.Label className="form-label">Wing</Form.Label>
                <Form.Control
                  as="select"
                  name="wing"
                  value={formData.wing}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select a wing</option>
                  <option value="Aeronautical Wing">Aeronautical Wing</option>
                  <option value="Ammo & Explosive Wing">Ammo & Explosive Wing</option>
                  <option value="Armament & Ballistics Wing">Armament & Ballistics Wing</option>
                  <option value="Cyber Security Wing">Cyber Security Wing</option>
                  <option value="Electrical & Mechanical Wing">Electrical & Mechanical Wing</option>
                  <option value="IT & GIS Wing">IT & GIS Wing</option>
                  <option value="Marine Wing">Marine Wing</option>
                  <option value="Nano and Modern Technology Wing">Nano and Modern Technology Wing</option>
                  <option value="Radio & Electronic Wing">Radio & Electronic Wing</option>
                  <option value="Satellite & Surveillance Wing">Satellite & Surveillance Wing</option>
                </Form.Control>
              </Form.Group>

              {/* Project */}
              <Form.Group controlId="formProject" className="mb-3">
                <Form.Label className="form-label">Project</Form.Label>
                <Form.Control
                  type="text"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* PO Value */}
              <Form.Group controlId="formPOValue" className="mb-3">
                <Form.Label className="form-label">PO Value</Form.Label>
                <Form.Control
                  type="text"
                  name="poValue"
                  value={formData.poValue}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Supplier */}
              <Form.Group controlId="formSupplier" className="mb-3">
                <Form.Label className="form-label">Supplier</Form.Label>
                <Form.Control
                  as="select"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleSupplierChange}
                  required
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.name}>
                      {supplier.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              {/* Items Selection */}
              <Form.Group controlId="formItems" className="mb-3">
                <Form.Label className="form-label">Items</Form.Label>
                <Form.Control
                  as="select"
                  onChange={handleItemChange}
                  required
                >
                  <option value="">Select Item</option>
                  {availableItems.map((item, idx) => (
                    <option key={idx} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              {/* Selected Items Table */}
              <Table bordered>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.item}</td>
                      <td>
                        <input
                          type="number"
                          value={itemQuantities[item.item] || item.quantity}
                          onChange={(e) => handleQuantityChange(e, item.item)}
                        />
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveItem(item.item)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Delivery Date */}
              <Form.Group controlId="formDeliveryDate" className="mb-3">
                <Form.Label className="form-label">Delivery Date</Form.Label>
                <Form.Control
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Submit Button */}
              <Button variant="primary" type="submit">
                Submit Purchase Order
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderPlace;
