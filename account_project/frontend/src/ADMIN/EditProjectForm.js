// EditProjectPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ProjectForm from './EditProject';
import axiosInstance from '../axiosInstance'; // Import your axios instance

const EditProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const response = await axiosInstance.get(`/api/project/get-project-by-id/${id}`);
      setProject(response.data);
    };

    fetchProject();
  }, [id]);

  const handleSave = async (updatedProject) => {
    try {
      await axiosInstance.put(`/api/project/update-project-by-id/${id}`, updatedProject);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Project updated successfully!',
        confirmButtonText: 'OK'
      });
      navigate('/admin-dashboard'); // Redirect after successful save
    } catch (error) {
      console.error('Failed to update project', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Failed to update project. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleCancel = () => {
    navigate('/admin-dashboard');
  };

  return (
    <div>
      {project ? (
        <ProjectForm 
          project={project} 
          onSave={handleSave} // Ensure this function is correctly passed
          onCancel={handleCancel} 
        />
      ) : (
        <p>Loading project...</p>
      )}
    </div>
  );
};


export default EditProjectPage;
