import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './css/projects.css';
import axiosInstance from '../axiosInstance';
import { handleError } from '../utils/errorHandler';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Projects = () => {
  const [formData, setFormData] = useState({
    demandNo:'',
    referenceNumber: '',
    date: '',
    wing: '',
    projectNumber: '',
    projectName: '',
    totalAllocationPerYear: '',
  });

  const [projectNumbers, setProjectNumbers] = useState([]);
  const [tableData, setTableData] = useState([
    { description: '', amount: '', estimatedValue: '', totalCost: '' },
  ]);

  const [totalProjectCost, setTotalProjectCost] = useState(0);
  const [formError, setFormError] = useState('');

  const calculateTotalCost = () => {
    const total = tableData.reduce((acc, row) => acc + parseFloat(row.totalCost || 0), 0);
    setTotalProjectCost(total);
  };

  useEffect(() => {
    calculateTotalCost();
  }, [tableData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'wing' && value) {
      setFormData(prevData => ({
        ...prevData,
        projectNumber: '',
        projectName: '',
      }));
      fetchProjectNumbers(value);
    }

    if (name === 'projectNumber' && value) {
      fetchProjectData(value);
    }
  };

  const fetchProjectNumbers = async (wing) => {
    try {
      const response = await axiosInstance.get('/api/project/wing', {
        params: { wing },
      });
      setProjectNumbers(response.data);
    } catch (error) {
      handleError(error);
    }
  };
  

    const fetchProjectData = async (projectNumber) => {
      try {
          const response = await axiosInstance.get('/api/project/name', {
              params: { projectNo: projectNumber },
          });

          if (response.status === 200) {
              const projectData = response.data;
              setFormData(prevData => ({
                  ...prevData,
                  projectName: projectData.projectName || '', // Change this to the correct property
              }));
          } else {
              Swal.fire({
                  title: 'Not Found',
                  text: `Project not found for number: ${projectNumber}`,
                  icon: 'warning',
                  confirmButtonText: 'OK',
              });
              setFormData(prevData => ({
                  ...prevData,
                  projectName: '',
              }));
          }
      } catch (error) {
          handleError(error);
      }
  };


  const handleTableChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTableData = [...tableData];
    updatedTableData[index][name] = value;

    if (name === 'amount' || name === 'estimatedValue') {
      updatedTableData[index].totalCost = (
        (parseFloat(updatedTableData[index].amount) || 0) * (parseFloat(updatedTableData[index].estimatedValue) || 0)
      ).toFixed(2);
    }

    setTableData(updatedTableData);
  };

  const addTableRow = () => {
    setTableData([...tableData, { description: '', amount: '', estimatedValue: '', totalCost: '' }]);
  };

  const removeTableRow = (index) => {
    const updatedTableData = tableData.filter((_, i) => i !== index);
    setTableData(updatedTableData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalAllocationPerYear = parseFloat(formData.totalAllocationPerYear);

    if (totalProjectCost > totalAllocationPerYear) {
      setFormError(`Total project cost (${totalProjectCost.toFixed(2)}) exceeds total allocation per year (${totalAllocationPerYear.toFixed(2)}).`);
      return;
    } else {
      setFormError('');
    }

    const payload = {
      type: "projectDemand",
      status: "on progress",
      estimatedValue: totalProjectCost,
      date: formData.date,
      projectNo: formData.projectNumber,
      demandNo: formData.referenceNumber, 
      refNo:formData.referenceNumber,
      allocationPerYear:formData.totalAllocationPerYear,
      wing: formData.wing,
      vote: formData.voteNumber,
      items: tableData.map(row => ({
        description: row.description,
        quantity: parseInt(row.amount, 10),
        estimatedValuePerUnit: parseFloat(row.estimatedValue),
        supplier: "test supplier",
      })),
    };

    //  backend API Call 
    axiosInstance.post('/api/demands/add-demand', payload)
      .then(response => {
        console.log('Success:', response.data);
        // Reset the form data
        setFormData({
          referenceNumber: '',
          date: '',
          wing: '',
          projectNumber: '',
          projectName: '',
          totalAllocationPerYear: '',
        });
        setTableData([{ description: '', amount: '', estimatedValue: '', totalCost: '' }]);

        Swal.fire({
          title: 'Success!',
          text: 'Demand submitted successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/clerk-dashboard';
          }
        });
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while submitting the data.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Projects</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 input-box1">
          <label htmlFor="referenceNumber" className="form-label">Reference Number</label>
          <input
            type="text"
            className="form-control"
            id="referenceNumber"
            name="referenceNumber"
            value={formData.referenceNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 input-box1">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 input-box1">
          <label htmlFor="voteNumber" className="form-label">Vote Number</label>
          <input
            type="text"
            className="form-control"
            id="voteNumber"
            name="voteNumber"
            value="2057"
            disabled
          />
        </div>

        <div className="mb-3 input-box1">
          <label htmlFor="wing" className="form-label">Wing</label>
          <select
            className="form-select"
            id="wing"
            name="wing"
            value={formData.wing}
            onChange={handleChange}
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

        <div className="mb-3 input-box1">
          <label htmlFor="projectNumber" className="form-label">Project Number</label>
          <select
            className="form-select"
            id="projectNumber"
            name="projectNumber"
            value={formData.projectNumber}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a project number</option>
            {projectNumbers.map((project) => (
              <option key={project.id} value={project.projectNo}>{project.projectNo}</option>
            ))}
          </select>
        </div>

        <div className="mb-3 input-box1">
          <label htmlFor="projectName" className="form-label">Project Name</label>
          <input
            type="text"
            className="form-control"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
            disabled // Consider removing this if you want to allow editing after fetching
          />
        </div>

        <div className="mb-3 input-box1">
          <label htmlFor="totalAllocationPerYear" className="form-label">Total Allocation Per Year</label>
          <input
            type="text"
            className="form-control"
            id="totalAllocationPerYear"
            name="totalAllocationPerYear"
            value={formData.totalAllocationPerYear}
            onChange={handleChange}
            required
          />
        </div>

        <h4 className="text-center mb-4 project-items-header">Items List</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Item Description</th>
              <th>Quantity</th>
              <th>Estimated Value Per Unit</th>
              <th>Total Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={row.description}
                    onChange={(e) => handleTableChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={row.amount}
                    onChange={(e) => handleTableChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    name="estimatedValue"
                    value={row.estimatedValue}
                    onChange={(e) => handleTableChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    name="totalCost"
                    value={row.totalCost}
                    onChange={(e) => handleTableChange(index, e)}
                    disabled
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeTableRow(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="text-end fw-bold">Total Project Cost:</td>
              <td colSpan="2" className="fw-bold">{totalProjectCost.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <button type="button" className="btn btn-primary mb-3 add-row" onClick={addTableRow}>
          Add Row
        </button>

        {formError && (
          <div className="alert alert-danger">
            {formError}
          </div>
        )}
        <div>
          <button type="submit" className="btn btn-success item-submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Projects;
