import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './SidebarClerk';
import axiosInstance from '../axiosInstance';  // Import your custom axiosInstance
import Swal from 'sweetalert2'; // Import SweetAlert2

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to the server using axiosInstance
      const response = await axiosInstance.post('/api/petty-cash/create', formData);

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Form submitted successfully.',
        }).then(() => {
          // Redirect to clerk dashboard after success
          window.location.href = "/clerk-dashboard";  // Adjust the URL according to your routing setup
        });
        // Optionally, reset the form after successful submission
        setFormData({
          voteName: '',
          voteNo: '',
          amount: '',
          reason: '',
          date: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while submitting the form. Please try again.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
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
    </div>
  );
};

export default PettyCashForm;
