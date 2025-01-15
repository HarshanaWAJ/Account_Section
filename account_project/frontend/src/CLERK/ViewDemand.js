import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axiosInstance from '../axiosInstance'; // Import the custom axios instance
import Sidebar from './SidebarClerk';

const ViewDemands = () => {
  const [projectDemands, setProjectDemands] = useState([]);
  const [otherDemands, setOtherDemands] = useState([]); // State for other demands
  const [loadingProjectDemands, setLoadingProjectDemands] = useState(true);
  const [loadingOtherDemands, setLoadingOtherDemands] = useState(true);
  const [errorProjectDemands, setErrorProjectDemands] = useState(null);
  const [errorOtherDemands, setErrorOtherDemands] = useState(null);

  // Fetch Project Demands
 // Fetch Project Demands
useEffect(() => {
  const fetchProjectDemands = async () => {
    try {
      const response = await axiosInstance.get('/api/demands/get-project-demand');
      console.log(response.data);
      setProjectDemands(Array.isArray(response.data) ? response.data : []);  // Handle if response is not an array
    } catch (err) {
      setErrorProjectDemands(err.response?.data?.message || err.message || 'Error fetching project demands');
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
        setErrorOtherDemands(err.response?.data?.message || err.message || 'Error fetching other demands');
      } finally {
        setLoadingOtherDemands(false);
      }
    };

    fetchOtherDemands();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-4">
        <h2 className="text-center mb-4">Project Demands</h2>
        {loadingProjectDemands && <p className="text-center">Loading Project Demands...</p>}
        {errorProjectDemands && <p className="text-center text-danger">{errorProjectDemands}</p>}
        {!loadingProjectDemands && !errorProjectDemands && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="text-center equal-width">Demand No.</th>
                <th className="text-center equal-width">Project No.</th>
                <th className="text-center equal-width">Wing</th>
                <th className="text-center equal-width">Date</th>
                <th className="text-center equal-width">Estimated Value</th>
                <th className="text-center equal-width">Status</th>
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
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <h2 className="text-center mb-4">Others (MT/Qstor) Demands</h2>
        {loadingOtherDemands && <p className="text-center">Loading Other Demands...</p>}
        {errorOtherDemands && <p className="text-center text-danger">{errorOtherDemands}</p>}
        {!loadingOtherDemands && !errorOtherDemands && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="text-center equal-width">Demand No.</th>
                <th className="text-center equal-width">Section</th>
                <th className="text-center equal-width">Vote</th>
                <th className="text-center equal-width">Date</th>
                <th className="text-center equal-width">Estimated Value</th>
                <th className="text-center equal-width">Status</th>
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
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ViewDemands;
