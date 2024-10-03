// src/ManageOfficers.js
import React from 'react';
import './manageOfficers.css'; // Ensure this CSS file is created for styling

const ManageOfficers = () => {
  const officers = [
    
  ];

  return (
    <div className="manage-officers">
      <h2>Manage Officers</h2>
      <table className="officer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {officers.map(officer => (
            <tr key={officer.id}>
              <td>{officer.id}</td>
              <td>{officer.name}</td>
              <td>{officer.position}</td>
              <td>{officer.department}</td>
              <td>{officer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOfficers;
