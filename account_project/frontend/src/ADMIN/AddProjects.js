import React, { useState } from 'react';
import axios from '../axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import './css/addproject.css';
import Sidebar from './SidebarAdmin';


const AddProject = () => {
  const [projectNo, setProjectNo] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState('');
  const [wing, setWing] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('');
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [expenditureUpToCurrentYear, setExpenditureUpToCurrentYear] = useState('');
  const [projectCategory, setProjectCategory] = useState('new'); // 'new' or 'existing'

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

    // Gather project data for both new and existing projects
    const projectData = {
      projectNo,
      projectName,
      projectType,
      wing,
      estimatedValue,
      startingDate,
      endingDate,
      projectCategory,
      currentYear,
      expenditureUpToCurrentYear
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
        setProjectType('');
        setWing('');
        setEstimatedValue('');
        setStartingDate('');
        setEndingDate('');
        setCurrentYear('');
        setExpenditureUpToCurrentYear('');
        setProjectCategory('new'); // Reset radio button selection
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
    <div className='d-flex'>
      <Sidebar />
    <div className="container mt-3 add-project-form">
      <div className="card shadow-lg card003">
      <div className="card-header001 bg-primary text-white border rounded p-1">
      <h2 className="text-white mb-4">Add Project</h2>
      </div>

      {/* Radio Buttons for Project Type */}
      <div className="form-group mb-3">
        <div className="form-check form-check-inline">
          <input
            type="radio"
            id="existingProject"
            name="projectCategory"
            value="existing"
            checked={projectCategory === 'existing'}
            onChange={(e) => setProjectCategory(e.target.value)}
            className="form-check-input"
          />
          <label className="form-check-label" htmlFor="existingProject">
            Existing Project
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            id="newProject"
            name="projectCategory"
            value="new"
            checked={projectCategory === 'new'}
            onChange={(e) => setProjectCategory(e.target.value)}
            className="form-check-input"
          />
          <label className="form-check-label" htmlFor="newProject">
            New Project
          </label>
        </div>
      </div>

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
          <label>Project Type</label>
          <input
            type="text"
            className="form-control"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            required placeholder='Project Type'
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
            <option value="Other">Other</option>
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

        {/* Fields for Existing Project */}
          {projectCategory === 'existing' && (
          <>
            <div className="form-group mb-3">
              <label>Current Year</label>
              <select
                className="form-control"
                value={currentYear}
                onChange={(e) => setCurrentYear(e.target.value)}
                required
              >
                <option value="" disabled>Select Year</option>
                {Array.from(new Array(30), (x, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-3">
              <label>Expenditure Up to Current Year</label>
              <input
                type="number"
                className="form-control"
                value={expenditureUpToCurrentYear}
                onChange={(e) => setExpenditureUpToCurrentYear(e.target.value)}
                required placeholder='Expenditure Up to Current Year'
              />
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary w-100">Add Project</button>
      </form>
      </div>
    </div>
    </div>
  );
};

export default AddProject;
