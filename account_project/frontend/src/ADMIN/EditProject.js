// ProjectForm.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './css/EditProjectForm.css';

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [projectNo, setProjectNo] = useState('');
  const [projectName, setProjectName] = useState('');
  const [wing, setWing] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('');
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');

  useEffect(() => {
    if (project) {
      setProjectNo(project.projectNo);
      setProjectName(project.projectName);
      setWing(project.wing);
      setEstimatedValue(project.estimatedValue);
      setStartingDate(project.startingDate);
      setEndingDate(project.endingDate);
    }
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProject = { projectNo, projectName, wing, estimatedValue, startingDate, endingDate };

    // Call onSave to handle saving the project
    onSave(updatedProject);
  };

  return (
    <div className="container mt-3 edit-project-form">
      <h2 className="text-center mb-4">Edit Project</h2>
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
        <button type="submit" className="btn btn-primary w-100">Save Project</button>
        <button type="button" className="btn btn-secondary w-100 mt-2" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default ProjectForm;
