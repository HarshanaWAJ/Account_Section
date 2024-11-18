import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PettyCashForm = () => {
    const [formData, setFormData] = useState({
      voteName: '',
      voteNo: '',
      amount: '',
      reason: '',
      date: ''
    });
  
    const voteOptions = {
      "Building": "1303",
      "Refreshments": "1409",
      "Highway": "1101",
      "Admin": "1205",
      "Vehicles": "1301"
    };
  
    const handleVoteNameChange = (e) => {
      const selectedVoteName = e.target.value;
      setFormData({
        ...formData,
        voteName: selectedVoteName,
        voteNo: voteOptions[selectedVoteName] || ''
      });
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Submitted Data:", formData);
      // Add your submit logic here
    };
  
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg">
              <div className="card-header bg-primary text-white">
                <h3>Petty Cash Form</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Vote Name:</label>
                    <select
                      className="form-select"
                      name="voteName"
                      value={formData.voteName}
                      onChange={handleVoteNameChange}
                      required
                    >
                      <option value="">Select a Vote Name</option>
                      {Object.keys(voteOptions).map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
  
                  <div className="mb-3">
                    <label className="form-label">Vote No:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="voteNo"
                      value={formData.voteNo}
                      readOnly
                    />
                  </div>
  
                  <div className="mb-3">
                    <label className="form-label">Amount:</label>
                    <input
                      type="number"
                      className="form-control"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
  
                  <div className="mb-3">
                    <label className="form-label">Reason:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
  
                  <div className="mb-3">
                    <label className="form-label">Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
  
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success w-100">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default PettyCashForm;
