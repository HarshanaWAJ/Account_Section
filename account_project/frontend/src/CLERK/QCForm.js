// src/QuotationForm.js
import React, { useState } from 'react';

const QuotationForm = () => {
    const [formData, setFormData] = useState({
        demandNo: '',
        qcNo: '',
        qcDate: '',
        openingDate: '',
        wing: '',
        vote: '',
        projectNo: '',
        projectName: '',
        itemDescription: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // You can add logic to handle form submission here (e.g., API call)
    };

    return (
        <div className="container">
            <h2>Quotation Call Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="demandNo" className="form-label">Demand No.</label>
                    <input
                        type="text"
                        className="form-control"
                        id="demandNo"
                        name="demandNo"
                        value={formData.demandNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="qcNo" className="form-label">QC No.</label>
                    <input
                        type="text"
                        className="form-control"
                        id="qcNo"
                        name="qcNo"
                        value={formData.qcNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="qcDate" className="form-label">QC Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="qcDate"
                        name="qcDate"
                        value={formData.qcDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="openingDate" className="form-label">Opening Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="openingDate"
                        name="openingDate"
                        value={formData.openingDate}
                        onChange={handleChange}
                        required
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
                <div className="mb-3">
                    <label htmlFor="vote" className="form-label">Vote</label>
                    <input
                        type="text"
                        className="form-control"
                        id="vote"
                        name="vote"
                        value={formData.vote}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="projectNo" className="form-label">Project No.</label>
                    <input
                        type="text"
                        className="form-control"
                        id="projectNo"
                        name="projectNo"
                        value={formData.projectNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="projectName" className="form-label">Project Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="projectName"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="itemDescription" className="form-label">Item Description</label>
                    <textarea
                        className="form-control"
                        id="itemDescription"
                        name="itemDescription"
                        value={formData.itemDescription}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default QuotationForm;
