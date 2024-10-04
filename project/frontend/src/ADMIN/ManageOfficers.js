import './css/manageOfficers.css';
import React, { useEffect, useState } from 'react';

const ManageOfficers = () => {
  const [officers, setOfficers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const response = await fetch('http://localhost:8088/api/admin/get-all-users');
        if (!response.ok) {
          throw new Error('Failed to fetch officers');
        }
        const data = await response.json();
        console.log(data); // Log the response data

        // Check if data.ourUsersList is an array before setting it
        if (Array.isArray(data.ourUsersList)) {
          setOfficers(data.ourUsersList);
        } else {
          throw new Error('Received data is not an array');
        }
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching officers.'); // Handle error
      }
    };

    fetchOfficers(); // Call the fetch function on component mount
  }, []);

  return (
    <div className="manage-officers container mt-4">
      <h2 className="mb-4">Manage Officers</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
      <table className="table table-striped table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {officers.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No officers found.</td>
            </tr>
          ) : (
            officers.map((officer) => (
              <tr key={officer.id}>
                <td>{officer.id}</td>
                <td>{officer.name}</td>
                <td>{officer.role}</td>
                <td>{officer.email}</td>
                <td>
                  <button className="btn btn-warning btn-sm mr-2 btn-manage-officers">Edit</button>
                  <button className="btn btn-danger btn-sm btn-manage-officers">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOfficers;
