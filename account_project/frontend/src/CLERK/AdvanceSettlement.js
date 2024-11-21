import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Sidebar from './SidebarClerk';

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

const AdvanceSettlementForm = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedWing, setSelectedWing] = useState('');
  const [selectedVote, setSelectedVote] = useState('');
  const [voteName, setVoteName] = useState('');

  // Example data for serial numbers
  const serialNumbers = [
  ];

  // Example data for project numbers related to wings
  const projectNumbers = {
    // Assuming you will fill this with data
  };

  // Create an array of vote numbers
  const voteNumbers = Object.keys(voteMapping).reduce((acc, key) => {
    return [...acc, ...Object.keys(voteMapping[key])];
  }, []);

  // Handle option change
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Handle wing change
  const handleWingChange = (e) => {
    setSelectedWing(e.target.value);
  };

  // Handle vote number change
  const handleVoteChange = (e) => {
    const voteNo = e.target.value;
    setSelectedVote(voteNo);
    
    // Find the corresponding vote name based on selected vote number
    const foundVoteName = Object.entries(voteMapping).reduce((acc, [category, votes]) => {
      if (votes[voteNo]) {
        return votes[voteNo];
      }
      return acc;
    }, '');

    setVoteName(foundVoteName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted successfully');
  };

  return (
    <div className="d-flex">
        <Sidebar />
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '600px' }}>
        <Card.Header className="bg-primary text-white">
          <h3 className="text">Advance Settlement Form</h3>
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
                  <Form.Select required>
                    <option value="">Select Serial Number</option>
                    {serialNumbers.map((serial, idx) => (
                      <option key={idx} value={serial}>{serial}</option>
                    ))}
                  </Form.Select>
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
                  <Form.Select>
                    <option value="">Select Project No.</option>
                    {selectedWing && projectNumbers[selectedWing]?.map((proj, idx) => (
                      <option key={idx} value={proj}>{proj}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Amount</Form.Label>
                  <Form.Control type="number" placeholder="Enter amount" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Settle Date</Form.Label>
                  <Form.Control type="date" required />
                </Form.Group>
              </>
            )}

            {/* Fields for "Others (MT/Qstor)" option */}
            {selectedOption === 'others' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Serial No.</Form.Label>
                  <Form.Select required>
                    <option value="">Select Serial Number</option>
                    {serialNumbers.map((serial, idx) => (
                      <option key={idx} value={serial}>{serial}</option>
                    ))}
                  </Form.Select>
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
                  <Form.Control type="number" placeholder="Enter amount" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Settle Date</Form.Label>
                  <Form.Control type="date" required />
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

export default AdvanceSettlementForm;
