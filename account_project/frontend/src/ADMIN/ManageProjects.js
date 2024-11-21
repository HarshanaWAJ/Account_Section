import React, { useEffect, useState } from 'react';
import './css/manageprojects.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead
import axiosInstance from '../axiosInstance';
import Sidebar from './SidebarAdmin';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use useNavigate here

  // Fetch all projects from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get('/api/projects/get-project-list');
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch projects.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/api/project/delete-project-by-id/${id}`);
        setProjects(projects.filter(project => project.id !== id));
        Swal.fire('Deleted!', response.data.message, 'success');
      } catch (error) {
        console.error('Error deleting project:', error);
        Swal.fire('Error!', 'Failed to delete the project.', 'error');
      }
    }
  };

  // Handle Edit and Navigate
  const handleEdit = (project) => {
    navigate(`/admin-dashboard/edit-projects/${project.id}`, { state: { project } });
  };


  // Conditional rendering for loading and no projects
  if (loading) {
    return <div className="alert alert-info" role="alert">Loading projects...</div>;
  }

  return (
    <div className='d-flex'>
      <Sidebar />
    <div className="manage-projects container mt-4">
      <h2>Manage Projects</h2>
      {projects.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No projects available. Please add a project.
        </div>
      ) : (
        <table className="table project-table">
          <thead className="thead-light">
            <tr>
              <th>Project No.</th>
              <th>Project Name</th>
              <th>Estimated Value</th>
              <th>Starting Date</th>
              <th>Ending Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.projectNo}</td>
                <td>{project.projectName}</td>
                <td>{project.estimatedValue}</td>
                <td>{project.startingDate}</td>
                <td>{project.endingDate}</td>
                <td>
                  <button className="btn btn-warning btn-sm mx-1" onClick={() => handleEdit(project)}>
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDelete(project.id)}>
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default ManageProjects;
