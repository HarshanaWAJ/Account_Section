import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/PurchaseOrderPlace.css'; // Import your custom CSS
import axiosInstance from '../axiosInstance';

const PurchaseOrderPlace = () => {

  const [qcNo, setQcNo] = useState('');
  const [error, setError] = useState('');
  const [quotationCallId, setQuotationCallId] = useState('');
  const [supplier, setSupplier] = useState('');
  const [suppliers, setSuppliers] = useState([]); // List of supplier names
  const [items, setItems] = useState([]);  // List of selected items
  const [availableItems, setAvailableItems] = useState([]); // List of items per supplier
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

  // Fetch the Quotation Call ID when QC Number changes
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

  // Fetch the supplier list from backend and extract only names
  const fetchSuppliers = async () => {
    try {
      const response = await axiosInstance.get('/api/suppliers/get-list');
      const supplierNames = response.data.map(supplier => supplier.name); 
      setSuppliers(supplierNames);  
    } catch (err) {
      console.error('Error fetching suppliers:', err);
    }
  };

  // Fetch items based on selected supplier
  const handleSupplierChange = async (e) => {
    const selectedSupplier = e.target.value;
    setSupplier(selectedSupplier);
  };

  const handleItemChange = (e) => {
    const selectedItem = e.target.value;
    setItems(prevItems => [...prevItems, selectedItem]);
  };

  const handleRemoveItem = (itemToRemove) => {
    setItems(prevItems => prevItems.filter(item => item !== itemToRemove));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.poReference ||
      !formData.qcNumber ||
      !formData.poDate ||
      !formData.wing ||
      !formData.project ||
      !formData.poValue ||
      !formData.supplier ||
      formData.items.length === 0 ||
      !formData.deliveryDate
    ) {
      alert('Please fill out all fields.');
      return;
    }

    console.log('Form submitted successfully:', formData);
    alert('Form submitted successfully!');
  };

  // Fetch suppliers when the component mounts
  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
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
                  <option key={index} value={supplier}>{supplier}</option>  // Render supplier name
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formItems" className="mb-3">
              <Form.Label className="form-label">Items</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    as="select"
                    multiple
                    onChange={handleItemChange}
                    value={items}
                  >
                    {availableItems.map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col>
                  <ul>
                    {items.map((item, index) => (
                      <li key={index}>
                        {item} 
                        <Button variant="danger" size="sm" onClick={() => handleRemoveItem(item)}>Remove</Button>
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
            </Form.Group>

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

            <div className="d-flex justify-content-end">
              <Button className="btn btn-success w-100" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderPlace;
