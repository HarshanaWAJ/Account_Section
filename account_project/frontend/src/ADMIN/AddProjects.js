import React, { useState } from 'react';
import axios from '../axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import './css/addproject.css';

const AddProject = () => {
  const [projectNo, setProjectNo] = useState('');
  const [projectName, setProjectName] = useState('');
  const [wing, setWing] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('');
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate project number
    if (!projectNo.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Input',
        text: 'Project number cannot be empty.',
        confirmButtonText: 'OK'
      });
      return;
    }

    const projectData = {
      projectNo,
      projectName,
      wing,
      estimatedValue,
      startingDate,
      endingDate,
    };

    try {
      const response = await axios.post('/api/projects/add-project', projectData);
      console.log('Response:', response.data);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Project Added!',
          text: 'The project has been successfully added.',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/admin-dashboard';
          }
        });
        
        // Reset the form
        setProjectNo('');
        setProjectName('');
        setWing('');
        setEstimatedValue('');
        setStartingDate('');
        setEndingDate('');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while adding the project. Please try again.';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="container mt-3 add-project-form">
      <h2 className="text-center mb-4 add-project-head">Add Project</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <div className="form-group mb-3">
          <label>Project Number</label>
          <input
            type="text"
            className="form-control"
            value={projectNo}
            onChange={(e) => setProjectNo(e.target.value)}
            required placeholder='Project No'
          />
        </div>
        <div className="form-group mb-3">
          <label>Project Name</label>
          <input
            type="text"
            className="form-control"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required placeholder='Project Name'
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="wing">Wing</label>
          <select
            id="wing"
            className="form-control"
            value={wing}
            onChange={(e) => setWing(e.target.value)}
            required
          >
            <option value="" disabled>Select a wing</option>
            <option value="Aeronautical Wing">Aeronautical Wing</option>
            <option value="Ammo & Explosive Wing">Ammo & Explosive Wing</option>
            <option value="Armament & Ballistics Wing">Armament & Ballistics Wing</option>
            <option value="Cyber Security Wing">Cyber Security Wing</option>
            <option value="Electrical & Mechanical Wing">Electrical & Mechanical Wing</option>
            <option value="IT & GIS Wing">IT & GIS Wing</option>
            <option value="Marine Wing">Marine Wing</option>
            <option value="Nano and Modern Technology Wing">Nano and Modern Technology Wing</option>
            <option value="Radio & Electronic Wing">Radio & Electronic Wing</option>
            <option value="Satellite & Surveillance Wing">Satellite & Surveillance Wing</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label>Estimated Value</label>
          <input
            type="number"
            className="form-control"
            value={estimatedValue}
            onChange={(e) => setEstimatedValue(e.target.value)}
            required placeholder='Estimated Value'
          />
        </div>
        <div className="form-group mb-3">
          <label>Starting Date</label>
          <input
            type="date"
            className="form-control"
            value={startingDate}
            onChange={(e) => setStartingDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Ending Date</label>
          <input
            type="date"
            className="form-control"
            value={endingDate}
            onChange={(e) => setEndingDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;
