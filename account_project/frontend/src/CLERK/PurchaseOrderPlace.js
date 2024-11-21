import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/PurchaseOrderPlace.css'; // Import your custom CSS
import Sidebar from './SidebarClerk';
import axiosInstance from '../axiosInstance';

const PurchaseOrderPlace = () => {

  const [qcNo, setQcNo] = useState('');
  const [error, setError] = useState('');
  const [quotationCallId, setQuotationCallId] = useState('');
  const [supplier, setSupplier] = useState('');
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
      const supplierList = response.data.map(supplier => ({
        id: supplier.id,
        name: supplier.supplierName
      }));

      setSuppliers(supplierList);  
      console.log('Fetched suppliers:', supplierList);
    } catch (err) {
      console.error('Error fetching suppliers:', err);
    }
  };

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
            console.log("Fetching items for Supplier ID:", supplierDetails.id);
            const response = await axiosInstance.get(`/api/supplier-items/get-supplier-items-by-supplier-id?supplierId=${supplierDetails.id}`);
            
            console.log("Response Data:", response.data);  // Check the actual response format

            // Only include items that have a name and quantity
            const validItems = response.data.filter(item => item.name && item.quantity);

            // If items don't have a supplier, you can add a placeholder
            validItems.forEach(item => {
              if (!item.supplier) {
                item.supplier = "No supplier available";  // Set a placeholder if no supplier is available
              }
            });

            setAvailableItems(validItems);
            console.log('Fetched items:', validItems);
        } catch (err) {
            console.error('Error fetching supplier items:', err);
            setAvailableItems([]);  // Handle case where no items are available or an error occurs
        }
    }
  };


  

  const handleItemChange = (e) => {
    const selectedItem = e.target.value;
    const quantity = itemQuantities[selectedItem] || 0;
    setItems(prevItems => [...prevItems, { item: selectedItem, quantity: quantity }]);
  };

  const handleQuantityChange = (e, item) => {
    const quantity = e.target.value;
    setItemQuantities(prevQuantities => ({
      ...prevQuantities,
      [item]: quantity,
    }));

    // Update items with the new quantity
    setItems(prevItems =>
      prevItems.map(i =>
        i.item === item ? { ...i, quantity: quantity } : i
      )
    );
  };

  const handleRemoveItem = (itemToRemove) => {
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
    
    if (
      !formData.poReference ||
      !formData.qcNumber ||
      !formData.poDate ||
      !formData.wing ||
      !formData.project ||
      !formData.poValue ||
      !formData.supplier ||
      items.length === 0 ||
      !formData.deliveryDate
    ) {
      alert('Please fill out all fields.');
      return;
    }

    const payload = {
      poRef: formData.poReference,
      qcNo: formData.qcNumber,
      poDate: formData.poDate,
      wing: formData.wing,
      project: formData.project,
      poValue: formData.poValue,
      supplier: formData.supplier,
      items: items.map(item => ({ name: item.item, quantity: item.quantity })),
      deliveryDate: formData.deliveryDate,
      quotationCallId: quotationCallId,
      supplierId: supplierId,
    };

    try {
      const response = await axiosInstance.post('/api/purchase-order/add-purchase-order', payload);

      if (response.status === 200) {
        alert('Purchase Order created successfully!');
        setFormData({
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
        setItems([]);
        setItemQuantities({});
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
                  {suppliers.map((supplier, index) => (
                    <option key={index} value={supplier.name}>{supplier.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>

             {/* Items */}
             <Form.Group controlId="formItems" className="mb-3">
                <Form.Label className="form-label">Items</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  onChange={handleItemChange}
                  value={items.map(item => item.item)}
                >
                  {availableItems && availableItems.length > 0 ? (
                    availableItems.map((item, index) => (
                      <option key={index} value={item.name}>{item.name}</option>
                    ))
                  ) : (
                    <option disabled>No items available</option>
                  )}
                </Form.Control>
              </Form.Group>

              {/* PO Value */}
              <Form.Group controlId="formPOValue" className="mb-3">
                <Form.Label className="form-label">PO Value</Form.Label>
                <Form.Control
                  type="number"
                  name="poValue"
                  value={formData.poValue}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

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
