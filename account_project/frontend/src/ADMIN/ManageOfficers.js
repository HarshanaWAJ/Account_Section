import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './css/manageOfficers.css'; // Import the CSS file
import OfficerForm from './EditOfficerForm'; // Import the form component
import Sidebar from './SidebarAdmin';


const ManageOfficers = () => {
  const [officers, setOfficers] = useState([]);
  const [error, setError] = useState(null);
  const [setSuccess] = useState(null);
  const [editingOfficer, setEditingOfficer] = useState(null); // Track the officer being edited

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const response = await fetch('http://localhost:8088/api/admin/get-all-users');
        if (!response.ok) {
          throw new Error('Failed to fetch officers');
        }
        const data = await response.json();
        console.log(data);

        if (Array.isArray(data.ourUsersList)) {
          setOfficers(data.ourUsersList);
        } else {
          throw new Error('Received data is not an array');
        }
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching officers.');
      }
    };

    fetchOfficers();
  }, []);

  const handleDelete = async (userID) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8088/api/admin/delete-user/${userID}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete officer');
        }

        setOfficers(officers.filter((officer) => officer.id !== userID));
        setSuccess('Officer deleted successfully!');
        setError(null);

        Swal.fire('Deleted!', 'The officer has been deleted.', 'success');
      } catch (error) {
        console.error(error);
        setError('An error occurred while deleting the officer.');
        setSuccess(null);
      }
    }
  };

  const handleEdit = (officer) => {
    setEditingOfficer(officer); // Set the officer to be edited
  };

  const handleUpdateOfficer = (updatedOfficer) => {
    setOfficers(
      officers.map((officer) => (officer.id === updatedOfficer.id ? updatedOfficer : officer))
    );
    setEditingOfficer(null); // Close the form
  };

  const handleCancelEdit = () => {
    setEditingOfficer(null); // Cancel the edit and close the form
  };

  return (
    <div className='d-flex'>
      <Sidebar />
    <div className="manage-officers container mt-4">
      <h2 className="mb-4">Manage Officers</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {editingOfficer ? (
        <OfficerForm
          officer={editingOfficer}
          onUpdateOfficer={handleUpdateOfficer}
          onCancel={handleCancelEdit}
        />
      ) : (
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
                    <button
                      className="btn btn-warning btn-sm mr-2 btn-manage-officers"
                      onClick={() => handleEdit(officer)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm btn-manage-officers"
                      onClick={() => handleDelete(officer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default ManageOfficers;
