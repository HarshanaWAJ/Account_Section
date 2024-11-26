import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Sidebar from './SidebarClerk';
import axiosInstance from '../axiosInstance'; // Assuming you have an axios instance
import Swal from 'sweetalert2'; // To display success/error messages

import { handleError } from '../utils/errorHandler';

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

const AdvanceReceivedForm = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedWing, setSelectedWing] = useState('');
  const [selectedVote, setSelectedVote] = useState('');
  const [voteName, setVoteName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [receivedDate, setReceivedDate] = useState('');
  const [projectNumbers, setProjectNumbers] = useState([]);
  const [projectNo, setProjectNo] = useState('');

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

  const voteNumbers = Object.keys(voteMapping).reduce((acc, key) => {
    return [...acc, ...Object.keys(voteMapping[key])];
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleWingChange = async (e) => {
    const wing = e.target.value;
    setSelectedWing(wing);
    if (wing) {
      await fetchProjectNumbers(wing);
    }
  };


  const handleVoteChange = (e) => {
    const voteNo = e.target.value;
    setSelectedVote(voteNo);
    const foundVoteName = Object.entries(voteMapping).reduce((acc, [category, votes]) => {
      if (votes[voteNo]) {
        return votes[voteNo];
      }
      return acc;
    }, '');
    setVoteName(foundVoteName);
  };

  const handleSerialNumberChange = (e) => {
    setSerialNumber(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleReceivedDateChange = (e) => {
    setReceivedDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      selectedOption,
      serialNo: serialNumber,
      wingOrVote: selectedWing,
      wingOrVote: selectedVote,
      projectOrVote: voteName,
      projectOrVote: projectNo,
      amount,
      recievedDate: receivedDate,
    };

    try {
      const response = await axiosInstance.post('/api/advance-received/create-advance-received', formData);
      if (response.status === 201) {
        Swal.fire({
          title: 'Success',
          text: 'Advance Received Submitted Successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Failed',
          text: 'Operation Failed',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while submitting the form.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <Container className="mt-5 d-flex justify-content-center">
        <Card style={{ width: '100%', maxWidth: '600px' }}>
          <Card.Header className="bg-primary text-white">
            <h3 className="text">Advance Received Form</h3>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              {/* Radio buttons for selecting option */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Select Option</Form.Label>
                <div className="d-flex">
                  <Form.Check
                    type="radio"
                    label="Project"
                    name="option"
                    value="project"
                    onChange={handleOptionChange}
                    checked={selectedOption === 'project'}
                    inline
                    className="me-3"
                  />
                  <Form.Check
                    type="radio"
                    label="Others (MT/Qstor)"
                    name="option"
                    value="others"
                    onChange={handleOptionChange}
                    checked={selectedOption === 'others'}
                    inline
                  />
                </div>
              </Form.Group>

              {/* Fields for "Project" option */}
              {selectedOption === 'project' && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Serial No.</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Serial No."
                      value={serialNumber}
                      onChange={handleSerialNumberChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Wing</Form.Label>
                    <Form.Select onChange={handleWingChange} value={selectedWing}>
                    <option value="">Select Wing</option>
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
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Project No.</Form.Label>
                    <Form.Select
                      value={projectNo}
                      onChange={(e) => setProjectNo(e.target.value)}
                    >
                      <option value="">Select Project No.</option>
                      {projectNumbers && projectNumbers.length > 0 ? (
                        projectNumbers.map((proj, idx) => (
                          <option key={idx} value={proj.projectNo}>{proj.projectNo}</option>
                        ))
                      ) : (
                        <option value="">No projects available</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Amount</Form.Label>
                    <Form.Control type="number" placeholder="Enter amount" value={amount} onChange={handleAmountChange} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Received Date</Form.Label>
                    <Form.Control type="date" value={receivedDate} onChange={handleReceivedDateChange} required />
                  </Form.Group>
                </>
              )}

              {/* Fields for "Others (MT/Qstor)" option */}
              {selectedOption === 'others' && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Serial No.</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Serial No."
                      value={serialNumber}
                      onChange={handleSerialNumberChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Vote No.</Form.Label>
                    <Form.Select onChange={handleVoteChange} value={selectedVote} required>
                      <option value="">Select Vote No.</option>
                      {voteNumbers.map((vote, idx) => (
                        <option key={idx} value={vote}>{vote}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Vote Name</Form.Label>
                    <Form.Control type="text" value={voteName} readOnly />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Amount</Form.Label>
                    <Form.Control type="number" placeholder="Enter amount" value={amount} onChange={handleAmountChange} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Received Date</Form.Label>
                    <Form.Control type="date" value={receivedDate} onChange={handleReceivedDateChange} required />
                  </Form.Group>
                </>
              )}

              {/* Submit button */}
              <Button variant="success" type="submit" className="w-100 mt-3">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdvanceReceivedForm;
