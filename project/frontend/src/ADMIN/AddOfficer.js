// src/AddOfficer.js
import React, { useState } from 'react';
import './css/addofficer.css'; // Import the CSS file

const AddOfficer = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Officer added:', { name, role, email, password });

    // Reset the form
    setName('');
    setRole('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="add-officer">
      <h2 className="h2">Add Officer</h2>
      <form onSubmit={handleSubmit}>
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
            <option value="admin">Admin</option>
            <option value="account-officer">Account Officer</option>
            <option value="clerk">Clerk</option>
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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Officer</button>
      </form>
    </div>
  );
};

export default AddOfficer;
