import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Swal from 'sweetalert2'; // Import SweetAlert2
import './css/addofficer.css'; // Import the CSS file
import Sidebar from './SidebarAdmin';


const AddOfficer = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const officerData = { name, role: role.toUpperCase(), email, password };

    try {
      const response = await fetch('http://localhost:8088/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(officerData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Failed to add officer');

        // Show SweetAlert for error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Failed to add officer',
        });
        
        setSuccess(null);
      } else {
        setSuccess('Officer added successfully!');
        setError(null);

        // Show SweetAlert for success
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Officer added successfully!',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/admin-dashboard'); // Navigate to admin dashboard
          }
        });

        // Reset the form after successful submission
        setName('');
        setRole('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setError('An error occurred while adding the officer.');

      // Show SweetAlert for catch error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the officer.',
      });
      
      setSuccess(null);
    }
  };

  return (
    <div className='d-flex'>
      <Sidebar />
    <div className="container mt-3 add-officer">
      <div className="card shadow-lg card003">
      <div className="card-header001 bg-primary text-white border rounded p-1">
      <h2 className="text-white mb-4">Add Officer</h2>
      </div>
      {error && <div className="error">{error}</div>} {/* Display error message */}
      {success && <div className="success">{success}</div>} {/* Display success message */}
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>Select a role</option>
            <option value="ADMIN">Admin</option>
            <option value="ACCOUNTANT">Account Officer</option>
            <option value="CLERK">Clerk</option>
          </select>
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={togglePasswordVisibility}
              aria-label="Toggle password visibility"
            >
              <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
            </button>
          </div>
        </div>
        <button type="submit">Add Officer</button>
      </form>
      </div>
    </div>
    </div>
  );
};

export default AddOfficer;
