import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Sidebar from './SidebarAccountant';
import axiosInstance from '../axiosInstance';

const ManageDemands = () => {
  const [projectDemands, setProjectDemands] = useState([]);
  const [otherDemands, setOtherDemands] = useState([]);
  const [loadingProjectDemands, setLoadingProjectDemands] = useState(true);
  const [loadingOtherDemands, setLoadingOtherDemands] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedDemand, setSelectedDemand] = useState(null); // Data of the selected demand

  // Fetch Project Demands
  useEffect(() => {
    const fetchProjectDemands = async () => {
      try {
        const response = await axiosInstance.get('/api/demands/get-project-demand');
        setProjectDemands(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching project demands');
      } finally {
        setLoadingProjectDemands(false);
      }
    };

    fetchProjectDemands();
  }, []);

  // Fetch Other Demands
  useEffect(() => {
    const fetchOtherDemands = async () => {
      try {
        const response = await axiosInstance.get('/api/demands/get-other-demand');
        setOtherDemands(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching other demands');
      } finally {
        setLoadingOtherDemands(false);
      }
    };

    fetchOtherDemands();
  }, []);

  // Handle opening the update modal
  const handleUpdate = (demand) => {
    setSelectedDemand(demand); // Set the selected demand data
    setShowModal(true); // Show the modal
  };

  // Handle saving the updated demand
  const handleSave = async () => {
    try {
      await axiosInstance.put(`/api/demands/${selectedDemand.demandNo}`, selectedDemand);
      alert('Demand updated successfully!');
      setShowModal(false); // Close the modal

      // Update the local state with the updated demand
      setProjectDemands((prev) =>
        prev.map((demand) => (demand.demandNo === selectedDemand.demandNo ? selectedDemand : demand))
      );
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Error updating demand');
    }
  };

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedDemand({ ...selectedDemand, [name]: value });
  };

  // Handle deleting a demand
  const handleDelete = async (demandNo) => {
    if (window.confirm(`Are you sure you want to delete demand ${demandNo}?`)) {
      try {
        await axiosInstance.delete(`/api/demands/${demandNo}`);
        setProjectDemands((prev) => prev.filter((demand) => demand.demandNo !== demandNo));
        setOtherDemands((prev) => prev.filter((demand) => demand.demandNo !== demandNo));
        alert(`Demand ${demandNo} deleted successfully`);
      } catch (err) {
        alert(err.response?.data?.message || err.message || 'Error deleting demand');
      }
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-4">
        <h2 className="text-center mb-4">Manage Project Demands</h2>
        {loadingProjectDemands && <p className="text-center">Loading Project Demands...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        {!loadingProjectDemands && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="text-center">Demand No.</th>
                <th className="text-center">Project No.</th>
                <th className="text-center">Wing</th>
                <th className="text-center">Date</th>
                <th className="text-center">Estimated Value</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectDemands.map((demand) => (
                <tr key={demand.demandNo}>
                  <td className="text-center">{demand.demandNo}</td>
                  <td className="text-center">{demand.projectNo}</td>
                  <td className="text-center">{demand.wing}</td>
                  <td className="text-center">{demand.date}</td>
                  <td className="text-center">{demand.estimatedValue}</td>
                  <td className="text-center">{demand.status}</td>
                  <td className="text-center">
                    <Button variant="primary" size="sm" onClick={() => handleUpdate(demand)}>
                      Update
                    </Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(demand.demandNo)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <h2 className="text-center mb-4">Manage Other Demands (MT/Qstor)</h2>
        {loadingOtherDemands && <p className="text-center">Loading Other Demands...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        {!loadingOtherDemands && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="text-center">Demand No.</th>
                <th className="text-center">Section</th>
                <th className="text-center">Vote</th>
                <th className="text-center">Date</th>
                <th className="text-center">Estimated Value</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {otherDemands.map((demand) => (
                <tr key={demand.demandNo}>
                  <td className="text-center">{demand.demandNo}</td>
                  <td className="text-center">{demand.section}</td>
                  <td className="text-center">{demand.vote}</td>
                  <td className="text-center">{demand.date}</td>
                  <td className="text-center">{demand.estimatedValue}</td>
                  <td className="text-center">{demand.status}</td>
                  <td className="text-center">
                    <Button variant="primary" size="sm" onClick={() => handleUpdate(demand)}>
                      Update
                    </Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(demand.demandNo)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Modal for updating demands */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Update Demand</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Demand No.</Form.Label>
                <Form.Control type="text" value={selectedDemand?.demandNo || ''} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Project No.</Form.Label>
                <Form.Control
                  type="text"
                  name="projectNo"
                  value={selectedDemand?.projectNo || ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Wing</Form.Label>
                <Form.Control
                  type="text"
                  name="wing"
                  value={selectedDemand?.wing || ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Estimated Value</Form.Label>
                <Form.Control
                  type="number"
                  name="estimatedValue"
                  value={selectedDemand?.estimatedValue || ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  name="status"
                  value={selectedDemand?.status || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ManageDemands;
