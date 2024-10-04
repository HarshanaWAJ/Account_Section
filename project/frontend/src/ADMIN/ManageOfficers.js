import React, { useState} from 'react';
import './css/manageOfficers.css';
//import { getOfficersData } from './AddOfficer';

const ManageOfficers = () => {
  const [officers] = useState([]);

 // useEffect(() => {
    // Automatically fill data from AddOfficers.js
   // const officersData = getOfficersData();
    //setOfficers(officersData);
  //}, []);

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
          {officers.map((officer, index) => (
            <tr key={index}>
              <td>{officer.id}</td>
              <td>{officer.name}</td>
              <td>{officer.role}</td>
              <td>{officer.email}</td>
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

export default ManageOfficers;
