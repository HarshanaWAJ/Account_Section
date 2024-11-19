import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../axiosInstance';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; 

const QuotationForm = () => {
    const navigate = useNavigate(); // Correctly get the navigate function

    const [demandId, setDemandId] = useState('');

    const [formData, setFormData] = useState({
        demandId: '',
        demandNo: '',
        qcNo: '',
        qcDate: '',
        openingDate: '',
        type: '',
        vote: '',
        projectNo: '',
        projectName: '',
        itemDescription: '',
        
    });

    const [error, setError] = useState('');
    const [items, setItems] = useState([]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'demandNo') {
            fetchDemandDetails(value);
        }

        if (name === 'type') {
            setFormData((prevData) => ({
                ...prevData,
                vote: value === 'projectDemand' ? '2057' : '',
            }));
        }
    };

    const fetchDemandDetails = async (demandNo) => {
        try {
            const response = await axiosInstance.get(`/api/demands/get-demand-by-name/${demandNo}`);
            const demand = response.data;

            if (demand) {
                if (demand.id) {
                    setFormData((prevData) => ({
                        ...prevData,
                        demandId: demand.id,
                    }));
                    setError('Demand Found');
                    fetchItemsByDemand(demand.id);
                    fetchProjectNo(demand.id);
                    setDemandId(demand.id);
                    
                    console.log("Demand ID: ", demandId);
                    
                } else {
                    setError('Quotation Call Details Are Already Available in the System.');
                }
            } else {
                setError('Demand not found');
            }
        } catch (err) {
            console.error('Error fetching demand details:', err);
            setError('Error fetching demand details. Please try again.');
        }
    };

    const fetchItemsByDemand = async (demandId) => {
        try {
            const response = await axiosInstance.get(`/api/quotations/items-by-demand/${demandId}`);
            setItems(response.data);
        } catch (error) {
            console.log('Error fetching items:', error);
            setError('Error fetching items. Please try again.');
        }
    };

    const fetchProjectNo = async (demandId) => {
        try {
            const response = await axiosInstance.get(`/api/quotations/get-project-no/${demandId}`);
            const projectNo = response.data.projectNo;
            setFormData((prevData) => ({
                ...prevData,
                projectNo: projectNo,
            }));
            fetchProjectName(projectNo);
        } catch (error) {
            console.error('Error fetching project number:', error);
            setError('Error fetching project number. Please try again.');
        }
    };

    const fetchProjectName = async (projectNo) => {
        try {
            const response = await axiosInstance.get(`/api/quotations/get-project-name/${projectNo}`);
            const projectName = response.data.projectName;
            setFormData((prevData) => ({
                ...prevData,
                projectName: projectName,
            }));
        } catch (error) {
            console.error('Error fetching project name:', error);
            setError('Error fetching project name. Please try again.');
        }
    };

    const checkQCNumber = async (qcNo) => {
        try {
            const response = await axiosInstance.get(`/api/quotations/get-by-qc-no/${qcNo}`);
            return response.data; 
        } catch (err) {
            console.error('Error checking QC number:', err);
            return null; 
        }
    };

    //Submit Data
    const handleSubmit = async (e) => {
        e.preventDefault();

        const existingQC = await checkQCNumber(formData.qcNo);
        if (existingQC) {
            Swal.fire({
                icon: 'error',
                title: 'QC Number Already Exists',
                text: 'The provided QC number is already in use. Please check and try again.',
                confirmButtonText: 'Okay',
            });
            return;
        }

        const demandType = formData.type === 'projectDemand' ? 'projectDemand' : 'otherDemand';

        const quotationCallData = {
            qcNo: formData.qcNo,
            qcDate: formData.qcDate,
            openingDate: formData.openingDate,
            demand: {
                type: demandType,
                id: formData.demandId,
            },
            vote: formData.vote,
            project: formData.type === 'projectDemand' ? {
                number: formData.projectNo,
                name: formData.projectName,
            } : null,
            itemDescription: formData.itemDescription,
        };
        

        try {
            const response = await axiosInstance.post('/api/quotations/add-quotation-call', quotationCallData);
            console.log('Quotation Call Created:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'Quotation Call Created',
                text: 'Your quotation call has been successfully created.',
                confirmButtonText: 'Okay',
            });

            // Navigate to the dashboard after successful submission
            navigate('/clerk-dashboard'); // Correctly use navigate function

            setFormData({
                demandId: '',
                demandNo: '',
                qcNo: '',
                qcDate: '',
                openingDate: '',
                type: '',
                vote: '',
                projectNo: '',
                projectName: '',
                itemDescription: '',
            });
            setItems([]);
            setError('');
        } catch (error) {
            console.error('Error creating quotation call:', error);
            setError('Error creating quotation call. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow" style={{ maxWidth: '600px', margin: 'auto' }}>
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Quotation Calling Form</h3>
                </div>
                <div className="card-body">
                    {error && (
                        <div className={`alert ${error.includes('Found') ? 'alert-success' : 'alert-danger'}`}>
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <fieldset className="mb-4">
                            <legend className="col-form-label mb-3">Select Quotation Call Type</legend>
                            <div className="form-check mb-2">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="projectDemand"
                                    name="type"
                                    value="projectDemand"
                                    checked={formData.type === 'projectDemand'}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label mb-2" htmlFor="projectDemand">
                                    Quotation Call for Project Demands
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="other"
                                    name="type"
                                    value="other"
                                    checked={formData.type === 'other'}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label mb-2" htmlFor="other">
                                    Quotation Call for Other Demands
                                </label>
                            </div>
                        </fieldset>

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

                        {formData.type === 'projectDemand' && (
                            <>
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
                                        readOnly
                                    />
                                </div>
                            </>
                        )}
                        
                        <div className="mb-3">
                            <label htmlFor="itemDescription" className="form-label">Item Description</label>
                            {items.length > 0 ? (
                                <table className="table table-striped table-bordered">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Description</th>
                                            <th>Quantity</th>
                                            <th>Estimated Value Per Unit</th>
                                            <th>Total Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.description}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.estimatedValuePerUnit.toFixed(2)}</td>
                                                <td>{item.totalCost.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                        <tr className="table-success">
                                            <th colSpan={3} className="text-end">Total Estimated Cost:</th>
                                            <th>{items.reduce((total, item) => total + item.totalCost, 0).toFixed(2)}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <p>No items found for this demand.</p>
                            )}
                        </div>

                        <button type="submit" className="btn btn-success w-100">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default QuotationForm;
