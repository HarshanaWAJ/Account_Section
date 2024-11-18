import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/others.css';
import Swal from 'sweetalert2'; // Import SweetAlert2
import axiosInstance from '../axiosInstance';

const Projects = () => {
  const voteMapping = {
    'Traveling Expenses': {
      '1101': 'Domestic',
      '1102': 'Foreign',
    },
    'Supplies': {
      '1201': 'Stationery and Office Requisites',
      '1202': 'Fuel',
      '1205': 'Other',
    },
    'Maintenance Expenditure': {
      '1301': 'Vehicles',
      '1302': 'Plant and Machinery',
      '1303': 'Buildings and Structures',
    },
    'Service': {
      '1401': 'Transport',
      '1402': 'Postal and Communication',
      '1403': 'Electricity & Water',
      '1404': 'Rents and local Taxes',
      '1409': 'Other',
    },
    'Rehabilitation & Improvement of Capital Assets': {
      '2001': 'Buildings & Structures',
      '2002': 'Plant, Machinery and Equipment',
      '2003': 'Vehicles',
    },
    'Acquisition of Capital Assets': {
      '2102': 'Furniture and Office Equipment',
      '2103': 'Plant, Machinery and Equipment',
      '2104': 'Buildings and Structures',
    },
    'Capacity Building': {
      '2401': 'Staff Training',
    },
    'Other Capital Expenditure': {
      '2507': 'Research and Development',
    },
    'National center for Cyber Security': {
      '2509': 'Other',
    },
  };

  const [formData, setFormData] = useState({
    referenceNumber: '',
    date: '',
    Section: '',
    VoteNumber: '',
    VoteName: '',
    totalAllocationPerYear: '',
  });

  const [tableData, setTableData] = useState([
    { description: '', quantity: '', estimatedValue: '', totalCost: '' },
  ]);

  const [totalCost, setTotalCost] = useState(0);
  const [totalEstimatedValue, setTotalEstimatedValue] = useState(0);
  const [formError, setFormError] = useState('');

  const calculateTotalCost = () => {
    const total = tableData.reduce((acc, row) => acc + parseFloat(row.totalCost || 0), 0);
    setTotalCost(total);
  };

  const calculateTotalEstimatedValue = () => {
    const total = tableData.reduce((acc, row) => acc + (parseFloat(row.estimatedValue) * parseFloat(row.quantity || 0) || 0), 0);
    setTotalEstimatedValue(total);
  };

  useEffect(() => {
    calculateTotalCost();
    calculateTotalEstimatedValue();
  }, [tableData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'VoteName') {
      let voteNumber = '';
      Object.entries(voteMapping).forEach(([category, votes]) => {
        Object.entries(votes).forEach(([vNumber, vName]) => {
          if (vName === value) {
            voteNumber = vNumber;
          }
        });
      });
      setFormData({ ...formData, VoteName: value, VoteNumber: voteNumber });
    } else if (name === 'VoteNumber') {
      let voteName = '';
      Object.entries(voteMapping).forEach(([category, votes]) => {
        Object.entries(votes).forEach(([vNumber, vName]) => {
          if (vNumber === value) {
            voteName = vName;
          }
        });
      });
      setFormData({ ...formData, VoteNumber: value, VoteName: voteName });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTableChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTableData = [...tableData];
    updatedTableData[index][name] = value;

    // Calculate total cost for the row
    if (name === 'quantity' || name === 'estimatedValue') {
      const quantity = parseFloat(updatedTableData[index].quantity) || 0;
      const estimatedValue = parseFloat(updatedTableData[index].estimatedValue) || 0;
      updatedTableData[index].totalCost = (quantity * estimatedValue).toFixed(2);
    }

    setTableData(updatedTableData);
  };

  const addTableRow = () => {
    setTableData([...tableData, { description: '', quantity: '', estimatedValue: '', totalCost: '' }]);
  };

  const removeTableRow = (index) => {
    const updatedTableData = tableData.filter((_, i) => i !== index);
    setTableData(updatedTableData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalAllocationPerYear = parseFloat(formData.totalAllocationPerYear);
    
    if (totalCost > totalAllocationPerYear) {
      setFormError(`Total cost (${totalCost.toFixed(2)}) exceeds total allocation per year (${totalAllocationPerYear.toFixed(2)}).`);
      return;
    } else {
      setFormError('');
    }
  
    // Format the data according to your API requirements
    const payload = {
      type: "otherDemand",
      demandNo: formData.referenceNumber,
      status: "on progress",
      estimatedValue: totalEstimatedValue,
      date: formData.date,
      //projectName: "New Building Project", // Change this to be dynamic if needed
      refNo: formData.referenceNumber,
      allocationPerYear: totalAllocationPerYear,
      section: formData.Section,
      vote: formData.VoteNumber,
      items: tableData.map(row => ({
        description: row.description,
        estimatedValuePerUnit: parseFloat(row.estimatedValue),
        quantity: parseInt(row.quantity, 10),
      })),
    };
  
    // Send the data to the API using axios
    axiosInstance.post('/api/demands/add-demand', payload)
      .then(response => {
        console.log('Success:', response.data);
        // Reset the form data
        setFormData({
          referenceNumber: '',
          date: '',
          Section: '',
          VoteNumber: '',
          VoteName: '',
          totalAllocationPerYear: '',
        });
        setTableData([{ description: '', quantity: '', estimatedValue: '', totalCost: '' }]);
  
        // Show success alert
        Swal.fire({
          title: 'Success!',
          text: 'Demand submitted successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to clerk-dashboard (update the URL as necessary)
            window.location.href = '/clerk-dashboard';
          }
        });
      })
      .catch(error => {
        console.error('Error:', error);
        // Show error alert
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
      <div className="card shadow-lg card003">
      <div className="card-header001 bg-primary text-white border rounded p-1">
      <h2 className="text-white mb-4">Others (Qstor/MT)</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
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
          <label htmlFor="section" className="form-label">Section</label>
          <select
            className="form-select"
            id="section"
            name="Section"
            value={formData.Section}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a section</option>
            <option value="MT">MT</option>
            <option value="Qstor">Qstor</option>
          </select>
        </div>

        <div className="mb-3 input-box1">
          <label htmlFor="voteName" className="form-label">Vote Name</label>
          <select
            className="form-select"
            id="voteName"
            name="VoteName"
            value={formData.VoteName}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a vote name</option>
            {Object.entries(voteMapping).map(([category, votes]) => (
              <optgroup key={category} label={category}>
                {Object.entries(votes).map(([voteNumber, voteName]) => (
                  <option key={voteNumber} value={voteName}>
                    {voteName}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="mb-3 input-box1">
          <label htmlFor="voteNumber" className="form-label">Vote Number</label>
          <input
            type="text"
            className="form-control"
            id="voteNumber"
            name="VoteNumber"
            value={formData.VoteNumber}
            onChange={handleChange}
            required
            readOnly
          />
        </div>

        <div className="mb-3 input-box1">
          <label htmlFor="totalAllocationPerYear" className="form-label">Total Allocation Per Year</label>
          <input
            type="number"
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
                    name="quantity"
                    value={row.quantity}
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
              <td colSpan="2" className="fw-bold">{totalCost.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="3" className="text-end fw-bold">Total Estimated Value:</td>
              <td colSpan="2" className="fw-bold">{totalEstimatedValue.toFixed(2)}</td>
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
    </div>
  );
};

export default Projects;
