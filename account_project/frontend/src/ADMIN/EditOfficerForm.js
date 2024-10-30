import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './css/EditOfficerForm.css';

const OfficerForm = ({ officer, onUpdateOfficer, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  useEffect(() => {
    if (officer) {
      setFormData({
        id: officer.id,
        name: officer.name,
        role: officer.role.toUpperCase(), // Ensure role is uppercase when loading
        email: officer.email,
        password: '', // Password field is optional, only needed for updating
      });
    }
  }, [officer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      role: formData.role.toUpperCase(), // Convert role to uppercase
    };

    try {
      const response = await fetch(`http://localhost:8088/api/admin/update-user/${updatedData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update officer');
      }

      const updatedOfficer = await response.json();

      Swal.fire('Success!', 'Officer updated successfully!', 'success');
      onUpdateOfficer(updatedOfficer); // Notify parent of update
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'An error occurred while updating the officer.', 'error');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mt-5 edit-details">
      <h2 className='header-edit'>Edit Officer Details</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            className="form-control"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a role</option>
            <option value="Admin">Admin</option>
            <option value="Account Officer">Account Officer</option>
            <option value="Clerk">Clerk</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password (optional)</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              >
                <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
              </button>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
        <button type="button" className="btn btn-secondary ml-2" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default OfficerForm;
