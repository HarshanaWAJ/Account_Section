import React, { useState } from 'react';
import './css/manageprojects.css'; // Create CSS for styling
//import { getProjectsData } from './projectsData'; // Import data

const ManageProjects = () => {
  const [projects] = useState([]);

  //useEffect(() => {
    // Automatically fill data from projectsData.js
    //const projectData = getProjectsData();
    //setProjects(projectData);
  //}, []);

  return (
    <div className="manage-projects">
      <h2>Manage Projects</h2>
      <table className="project-table">
        <thead>
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
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.projectNo}</td>
              <td>{project.projectName}</td>
              <td>{project.estimatedValue}</td>
              <td>{project.startingDate}</td>
              <td>{project.endingDate}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProjects;
