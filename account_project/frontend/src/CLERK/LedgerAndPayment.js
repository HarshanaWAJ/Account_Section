import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './css/LedgerAndPayment.css';

function LedgerAndPaymentForm() {
  const [formData, setFormData] = useState({
    g35No: "",
    date: "",
    poNo: "",
    invoiceNo: "",
    value: "",
    voteNo: "",
    remainingBalance: "",
    qciNo: "",
  });

  const [showSubForm, setShowSubForm] = useState(false);
  const [subFormData, setSubFormData] = useState({
    qcNo: "",
    poDate: "",
    wing: "",
    project: "",
    supplier: "",
    itemsList: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    if (name === "poNo" && value !== "") {
      setShowSubForm(true);
    } else if (name === "poNo" && value === "") {
      setShowSubForm(false);
    }
  };

  const handleSubFormChange = (e) => {
    const { name, value } = e.target;
    setSubFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg container001">
        <div className="card-header bg-primary text-white">
          <h3>Ledger and Payment Form</h3>
        </div>
        <div className="card-body">
          <form>
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

              {showSubForm && (
                <div className="col-md-6">
                  <div className="border p-3 bg-light rounded">
                    <div className="mb-3">
                      <label className="form-label">QC No.</label>
                      <input
                        type="text"
                        className="form-control"
                        name="qcNo"
                        value={subFormData.qcNo}
                        onChange={handleSubFormChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">PO Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="poDate"
                        value={subFormData.poDate}
                        onChange={handleSubFormChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Wing</label>
                      <input
                        type="text"
                        className="form-control"
                        name="wing"
                        value={subFormData.wing}
                        onChange={handleSubFormChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Project</label>
                      <input
                        type="text"
                        className="form-control"
                        name="project"
                        value={subFormData.project}
                        onChange={handleSubFormChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Supplier</label>
                      <input
                        type="text"
                        className="form-control"
                        name="supplier"
                        value={subFormData.supplier}
                        onChange={handleSubFormChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Items List</label>
                      <input
                        type="text"
                        className="form-control"
                        name="itemsList"
                        value={subFormData.itemsList}
                        onChange={handleSubFormChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

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
                  <option value="">Select Vote No.</option>
                  <option value="1101">1101</option>
                  <option value="1102">1102</option>
                  <option value="1201">1201</option>
                  <option value="1202-009">1202-009</option>
                  <option value="1202-010">1202-010</option>
                  <option value="1205">1205</option>
                  <option value="1301">1301</option>
                  <option value="1302">1302</option>
                  <option value="1303">1303</option>
                  <option value="1401">1401</option>
                  <option value="1402">1402</option>
                  <option value="1403">1403</option>
                  <option value="1404">1404</option>
                  <option value="1409">1409</option>
                  <option value="2001">2001</option>
                  <option value="2002">2002</option>
                  <option value="2003">2003</option>
                  <option value="2102">2102</option>
                  <option value="2103">2103</option>
                  <option value="2104">2104</option>
                  <option value="2401">2401</option>
                  <option value="2507">2507</option>
                  <option value="2509">2509</option>
                  {/* Add more vote options here */}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Remaining Balance</label>
                <input
                  type="number"
                  className="form-control"
                  name="remainingBalance"
                  value={formData.remainingBalance}
                  onChange={handleChange}
                  required
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
  );
}

export default LedgerAndPaymentForm;
