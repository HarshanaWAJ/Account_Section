// src/AddProject.js
import React, { useState } from 'react';
import './css/addproject.css'; // Import the CSS file

const AddProject = () => {
  const [projectNumber, setProjectNumber] = useState('');
  const [projectName, setProjectName] = useState('');
  const [wing, setWing] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('');
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Project added:', { projectNumber, projectName, wing, estimatedValue, startingDate, endingDate });

    // Reset the form
    setProjectNumber('');
    setProjectName('');
    setWing('');
    setEstimatedValue('');
    setStartingDate('');
    setEndingDate('');
  };

  return (
    <div className="add-project">
      <h2 className="h2">Add Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Number:</label>
          <input
            type="text"
            value={projectNumber}
            onChange={(e) => setProjectNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Wing:</label>
          <input
            type="text"
            value={wing}
            onChange={(e) => setWing(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Estimated Value:</label>
          <input
            type="text"  // Changed from 'number' to 'text'
            value={estimatedValue}
            onChange={(e) => setEstimatedValue(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Starting Date:</label>
          <input
            type="date"
            value={startingDate}
            onChange={(e) => setStartingDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ending Date:</label>
          <input
            type="date"
            value={endingDate}
            onChange={(e) => setEndingDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;
