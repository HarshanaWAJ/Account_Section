import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './css/PurchaseOrderPlace.css'; // Import your custom CSS
import Sidebar from './SidebarClerk';


const PurchaseOrderPlace = () => {
  const [formData, setFormData] = useState({
    poReference: '',
    qcNumber: '',
    poDate: '',
    wing: '',
    project: '',
    poValue: '',
    supplier: '',
    items: '',
    deliveryDate: '',
  });

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
      !formData.items ||
      !formData.deliveryDate
    ) {
      alert('Please fill out all fields.');
      return;
    }
    console.log('Form submitted successfully:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="d-flex">
        <Sidebar />
    <div className="container mt-5">
      <div className="card shadow-lg card001">
        <div className="card-header bg-primary text-white">
          <h3 className="text">Purchase Order Place</h3>
        </div>
        <div className="card-body">
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
                value={formData.qcNumber}
                onChange={handleChange}
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

            <Form.Group controlId="formProject" className="mb-3">
              <Form.Label className="form-label">Project</Form.Label>
              <Form.Control
                as="select"
                name="project"
                value={formData.project}
                onChange={handleChange}
                required
              >
                <option value="">Select Project</option>
              </Form.Control>
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

            <Form.Group controlId="formSupplier" className="mb-3">
              <Form.Label className="form-label">Supplier</Form.Label>
              <Form.Control
                as="select"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                required
              >
                <option value="">Select Supplier</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formItems" className="mb-3">
              <Form.Label className="form-label">Item/Items</Form.Label>
              <Form.Control
                type="text"
                name="items"
                value={formData.items}
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
    </div>
  );
};

export default PurchaseOrderPlace;
