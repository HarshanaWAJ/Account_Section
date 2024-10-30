// src/QCProject.js
import React from 'react';
import './css/qcProject.css';

const QCproject = ({ projects = [] }) => {
    const handleQuotationCall = (project) => {
        console.log("Quotation Call for:", project);
        // Handle the action as needed, like navigating or opening another page
    };

    return (
        <div className="container">
            <h2 className='header-onprogress'>Onprogress Project List</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Reference No.</th>
                            <th>Vote No.</th>
                            <th>Project No.</th>
                            <th>Project Name</th>
                            <th>Wing</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    
                </table>
        </div>
    );
};

export default QCproject;
