// src/Welcome.js
import React, { useEffect } from 'react';
import './css/welcome.css'; // Optional: For styles

import logoImage from "../assets/crd logo.png";

const Welcome = () => {
  useEffect(() => {
    document.title = "Welcome"; // Set the document title
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <div className="landing-page">
        <div className="nav-bar">
          <div className="logo">
            <img src={logoImage} alt="Logo of the CDRD" className='logo'/>
          </div>
          <div className="logo-name">
            CDRD
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
