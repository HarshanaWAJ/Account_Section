// src/Welcome.js
import React, { useEffect } from 'react';
import './css/welcome.css'; // Optional: For styles

const Welcome = () => {
  useEffect(() => {
    document.title = "Welcome"; // Set the document title
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <header className="header">
        <div className="logo-container">
          <h1>CENTER FOR DEFENCE RESEARCH AND DEVELOPMENT</h1>
        </div>
        <div className="login1">
          
        </div>
      </header>
      <main>
        <section>
        <a href="/login" className="login-button1">Login</a>
        <img src="/crd logo.png" alt="CRD Logo" className="logo" /> {/* Add the image here */}
          <h2 className="header2">Quotation Tracking System</h2>
        </section>
      </main>
    </div>
  );
};

export default Welcome;
