import React, { useEffect, useState } from 'react';
import Sidebar from '../SidebarAccountant';
import Table from 'react-bootstrap/Table';
import './css/ProjectSummaryStyle.css'; // Ensure the path is correct
import * as XLSX from 'xlsx'; // Import XLSX
import { FaFileExcel } from 'react-icons/fa';
import { jsPDF } from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Optional for advanced table formatting

import axiosInstance from '../../axiosInstance';

function ProjectSummary() {
  const [RespondData, setRespondData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  
  console.log(totalValue);
  

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/demands/project-demand-summary');
        console.log(response.data);  // Log the fetched data
        calculateRowTotals(response.data); // Calculate row totals and update state
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };
    fetchData();
  }, []);

  // Calculate row-wise total and overall total, including balance
  const calculateRowTotals = (data) => {
    let total = 0;
    const updatedData = data.map(item => {
      // Calculate the row total based on Expenditure, Commitments, and On Progress
      const rowTotal = (item.value || 0) + (item.procurement_amount || 0) + (item.onProgress || 0);

      // Calculate the Balance as Allocation Per Year - max(Expenditure, Commitments, On Progress)
      const maxValue = Math.max(item.value || 0, item.procurement_amount || 0, item.onProgress || 0);
      const balance = (item.allocation_per_year || 0) - maxValue;

      total += rowTotal;
      return { ...item, total: rowTotal, balance: balance }; // Add row total and balance to each item
    });
    setTotalValue(total); // Update overall total
    setRespondData(updatedData); // Update the state with the modified data
  };

  // Helper function to format the date and time
  const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  };

  // Function to export data to Excel
  const exportToExcel = () => {
    const formattedDate = getFormattedDate();
    const ws = XLSX.utils.json_to_sheet(RespondData); // Use RespondData instead of data
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Project Summary");
    XLSX.writeFile(wb, `project_summary_${formattedDate}.xlsx`);
  };

  // Function to export data to PDF
  const exportToPDF = () => {
    const formattedDate = getFormattedDate();
    const doc = new jsPDF();

    // Set the title for the PDF
    doc.setFontSize(16);
    doc.text("Project Summary", 14, 20);

    // Prepare the table columns
    const tableColumns = [
      "S/N", "Wing", "Project Number", "Project", "Project Type", "Starting Date", 
      "Ending Date", "Status", "Estimated Value", "Current Year", "Expenditure up to Current Year", 
      "Total Expenditures", "On Progress", "Commitments", "Expenditures", "Balance"
    ];

    // Prepare table rows
    const tableRows = RespondData.map(row => [
      row.serial, row.wing, row.project_no, row.project_name, row.project_type, row.starting_date,
      row.ending_date, row.status, row.estimated_value, row.current_year, row.expenditure_up_to_current_year,
      row.totalExpenditures, row.onProgress, row.po_value, row.expenditures, row.balance
    ]);

    // Add table to the PDF document
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 30, // Starting Y position for the table
      theme: 'grid', // Grid style
    });

    // Save the generated PDF
    doc.save(`vote_summary_${formattedDate}.pdf`);
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="project-summary-container flex-grow-1">
        <div className="header">
          <h4>Project Summary</h4>
        </div>
        <div className="project-summary-card">
          <div className="project-summary-card-body">
            {/* Make the table responsive */}
            <div className="table-responsive">
              <Table striped="columns" hover>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Wing</th>
                    <th>Project Number</th>
                    <th>Project</th>
                    <th>Project Type</th>
                    <th>Starting Date</th>
                    <th>Ending Date</th>
                    <th>Status</th>
                    <th>Estimated Value</th>
                    <th>Current Year</th>
                    <th>Expenditure up to Current Year</th>
                    <th>Total Expenditures</th>
                    <th>On Progress</th>
                    <th>Commitments</th>
                    <th>Expenditures</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map your RespondData into table rows */}
                  {RespondData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.id}</td>
                      <td>{row.wing}</td>
                      <td>{row.project_no}</td>
                      <td>{row.project_name}</td>
                      <td>{row.project_type}</td>
                      <td>{row.starting_date}</td>
                      <td>{row.ending_date}</td>
                      <td>{row.status}</td>
                      <td>{row.estimated_value}</td>
                      <td>{row.current_year}</td>
                      <td>{row.expenditure_up_to_current_year}</td>
                      <td>{row.totalExpenditures}</td>
                      <td>{row.onProgress}</td>
                      <td>{row.po_value}</td>
                      <td>{row.expenditures}</td>
                      <td>{row.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {/* Add the export buttons */}
            <button onClick={exportToExcel} className="btn btn-primary mt-4">
              <FaFileExcel style={{ marginRight: '8px' }} /> Export to Excel
            </button>
            <button onClick={exportToPDF} className="btn btn-danger mt-4 ml-2">
              <i className="fas fa-file-pdf" style={{ marginRight: '8px' }}></i> Export to PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectSummary;
