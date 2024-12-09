import React, { useEffect, useState } from 'react';
import Sidebar from '../SidebarAccountant';
import './css/VoteSummaryStyle.css';
import Table from 'react-bootstrap/Table';
import * as XLSX from 'xlsx'; // Import XLSX for Excel export
import { jsPDF } from 'jspdf'; // Import jsPDF for PDF export
import 'jspdf-autotable'; // Optional for advanced table formatting
import axiosInstance from '../../axiosInstance';

function VoteSummary() {
  const [RespondData, setRespondData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

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

  // Calculate row-wise total and overall total, including balance
  const calculateRowTotals = (data) => {
    let total = 0;
    const updatedData = data.map(item => {
      // Calculate the row total based on Expenditure, Commitments, and On Progress
      const rowTotal = (item.value || 0) + (item.procurement_amount || 0) + (item.onProgress || 0);

      // Calculate the Balance as Allocation Per Year - max(Expenditure, Commitments, On Progress)
      const maxValue = Math.max(item.value || 0, item.procurement_amount || 0, item.onProgress || 0);
      const balance = (item.allocation_per_year || 0) - maxValue;

      // Map vote number to vote name
      let voteName = 'N/A';
      Object.keys(voteMapping).forEach(category => {
        if (voteMapping[category][item.vote]) {
          voteName = voteMapping[category][item.vote];
        }
      });

      total += rowTotal;
      return { ...item, total: rowTotal, balance: balance, voteName: voteName }; // Add row total and balance to each item
    });
    setTotalValue(total); // Update overall total
    setRespondData(updatedData); // Update the state with the modified data
  };

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/demands/other-demand-summary');
        console.log(response.data);  // Log the fetched data
        calculateRowTotals(response.data); // Calculate row totals and update state
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };
    fetchData();
  }, []);

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

  const exportToExcel = () => {
    const formattedDate = getFormattedDate();
  
    // Define the column headers in the order you want
    const headers = [
      "S/N", "Vote Number", "Vote Name", "Allocation Per Year", "Estimated Value", "Reference Number", 
      "Status", "Expenditure", "Commitments", "On Progress", "Total", "Balance"
    ];
  
    // Map the filteredRespondData to match the column order
    const orderedData = filteredRespondData.map(row => {
      return {
        "S/N": row.serial || 'N/A',
        "Vote Number": row.vote || 'N/A',
        "Vote Name": row.voteName || 'N/A',
        "Allocation Per Year": row.allocation_per_year || 'N/A',
        "Estimated Value": row.estimated_value || 'N/A',
        "Reference Number": row.po_ref || 'N/A',
        "Status": row.status || 'N/A',
        "Expenditure": row.value || 'N/A',
        "Commitments": row.procurement_amount || 'N/A',
        "On Progress": row.onProgress || 'N/A',
        "Total": row.total || 'N/A',
        "Balance": row.balance || 'N/A'
      };
    });
  
    // Convert the ordered data to a worksheet
    const ws = XLSX.utils.json_to_sheet(orderedData, { header: headers });
  
    // Apply styles to the headers (dark background and white text)
    const headerStyle = {
      fill: { 
        fgColor: { rgb: "000000" }  // Dark background color (black)
      },
      font: {
        color: { rgb: "FFFFFF" },    // White text color
        bold: true                  // Bold font
      },
      alignment: {
        horizontal: "center"       // Center-align text
      }
    };
  
    // Apply styles to the header row (row 1 is the first row in Excel)
    const headerRow = ws['!rows'] || [];
    ws['A1'].s = headerStyle;  // Apply style to the first header cell (A1)
    ws['B1'].s = headerStyle;  // Apply style to the second header cell (B1)
    ws['C1'].s = headerStyle;  // Apply style to the third header cell (C1)
    ws['D1'].s = headerStyle;  // Apply style to the fourth header cell (D1)
    ws['E1'].s = headerStyle;  // Apply style to the fifth header cell (E1)
    ws['F1'].s = headerStyle;  // Apply style to the sixth header cell (F1)
    ws['G1'].s = headerStyle;  // Apply style to the seventh header cell (G1)
    ws['H1'].s = headerStyle;  // Apply style to the eighth header cell (H1)
    ws['I1'].s = headerStyle;  // Apply style to the ninth header cell (I1)
    ws['J1'].s = headerStyle;  // Apply style to the tenth header cell (J1)
    ws['K1'].s = headerStyle;  // Apply style to the eleventh header cell (K1)
    ws['L1'].s = headerStyle;  // Apply style to the twelfth header cell (L1)
  
    // Adjust column width automatically
    const columnWidths = [];
    orderedData.forEach((row) => {
      Object.keys(row).forEach((key, index) => {
        const value = row[key];
        const columnLength = (value ? value.toString().length : 0); // Get length of the content
        if (columnWidths[index]) {
          columnWidths[index] = Math.max(columnWidths[index], columnLength); // Set max length for the column
        } else {
          columnWidths[index] = columnLength; // Set initial length for the column
        }
      });
    });
  
    // Adjust the width of each column based on the maximum content length
    ws['!cols'] = columnWidths.map(width => ({ wch: width + 2 })); // Adding 2 extra units for padding
  
    // Create a new workbook and append the sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vote Summary");
  
    // Trigger the file download with dynamic filename
    XLSX.writeFile(wb, `vote_summary_${formattedDate}.xlsx`);
  };  


  // Function to export data to PDF
  const exportToPDF = () => {
    const formattedDate = getFormattedDate();
    const doc = new jsPDF('landscape'); // Specify 'landscape' mode for the PDF
  
    // Set the title for the PDF
    doc.setFontSize(16);
    doc.text("Vote Summary", 14, 20);
  
    // Prepare the table columns (headers)
    const tableColumns = [
      "S/N", "Vote Number", "Vote Name", "Allocation Per Year", "Estimated Value", "Reference Number", 
      "Status", "Expenditure", "Commitments", "On Progress", "Total", "Balance"
    ];
  
    // Prepare table rows (data) using filteredRespondData
    const tableRows = filteredRespondData.map(row => [
      row.serial, row.vote, row.voteName, row.allocation_per_year, row.estimated_value, row.po_ref,
      row.status, row.value, row.procurement_amount, row.onProgress, row.total, row.balance
    ]);
  
    // Add the table to the PDF in landscape mode
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 30, // Starting Y position for the table
      theme: 'grid', // Grid style for the table
    });
  
    // Save the generated PDF with dynamic filename
    doc.save(`vote_summary_${formattedDate}.pdf`);
  };
  

  // Filter data to exclude rows where vote number is 'N/A', undefined or null
  const filteredRespondData = RespondData.filter(row => row.vote && row.vote.trim() !== 'N/A' && row.vote.trim() !== '');

  return (
    <div className="d-flex">
      <Sidebar />
      
      <div className="vote-summary-container flex-grow-1">
        <div className="header">
          <h4>Vote Summary</h4>
        </div>
        <div className="vote-summary-card">
          <div className="vote-summary-card-body">
            {/* Table to display the data */}
            <div className="table-responsive">
              <Table striped="columns" hover>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Vote Number</th>
                    <th>Vote Name</th>
                    <th>Allocation Per Year</th>
                    <th>Estimated Value</th>
                    <th>Reference Number</th>
                    <th>Status</th>
                    <th>Expenditure</th>
                    <th>Commitments</th>
                    <th>On Progress</th>
                    <th>Total</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map the filtered data into rows */}
                  {filteredRespondData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.serial || 'N/A'}</td>
                      <td>{row.vote || 'N/A'}</td>
                      <td>{row.voteName || 'N/A'}</td>
                      <td>{row.allocation_per_year || 'N/A'}</td>
                      <td>{row.estimated_value || 'N/A'}</td>
                      <td>{row.po_ref || 'N/A'}</td>
                      <td>{row.status || 'N/A'}</td>
                      <td>{row.value || 'N/A'}</td>
                      <td>{row.procurement_amount || 'N/A'}</td>
                      <td>{row.onProgress || 'N/A'}</td>
                      <td>{row.total || 'N/A'}</td>
                      <td>{row.balance || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* Export buttons with icons */}
              <div className="export-buttons">
                <button onClick={exportToExcel} className="btn btn-primary mt-4">
                  <i className="fa fa-file-excel mr-3"></i> Export to Excel
                </button>
                <button onClick={exportToPDF} className="btn btn-danger mt-4 ml-2">
                  <i className="fa fa-file-pdf mr-3"></i> Export to PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoteSummary;
