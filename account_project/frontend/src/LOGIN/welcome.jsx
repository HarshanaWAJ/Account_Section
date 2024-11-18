// src/Welcome.js
import React, { useEffect } from 'react';
import './css/welcome.css'; 
import { Link } from 'react-router-dom';

import logoImage from "../assets/crd logo.png";
import backgroundImg from "../assets/background_img.png";

const Welcome = () => {
  useEffect(() => {
    document.title = "QMS"; 
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className='page'>
      <div className="landing-page">
        <div className="nav-bar">
          <div className="logo">
            <img src={logoImage} alt="Logo of the CDRD" className='logo'/>
          </div>
          <div className="logo-name">
            Centre for Defense Research and Development
          </div>  
            <Link to="/login" className="login-button"> {/* Use Link to navigate */}
              <i className="fas fa-sign-in-alt"></i> {/* Login Icon */}
              Login
            </Link>
        </div>
        <div className="welcome-body">
          <div className="system-head">
            Quotation Management System
          </div>
          <br/>
            <Link to="/login" className="started-button"> {/* Use Link to navigate */}
              Get Started
            </Link>
            <img src={backgroundImg} alt="Welcome of the Account Sector" className='welcome-img'/>
        </div>
        <div className="footer">
          <div className="address">
            <div className="fas fa-map-marker-alt"></div>
            <div className="address-line-1">
              Centre for Defense Research and Development,
              Mahenawaththa Road, <br/>
              Pitipana, <br/>
              Homagama.
            </div>
          </div>
          <div className="email">
            <div className="fas fa-envelope"></div>
            hq@crd.lk <br/>
            hqcrdmod@gmail.com
          </div>
          <div className="contact">
            <div className='fas fa-phone'></div>
              011-2098032 <br/>
              077-3929482
          </div>
          <div className="fax">
            <div className='fas fa-fax'></div>
            <div className="fax-1">011-2182175</div>
          </div>
          <div className="copyright">&copy; 2024 Centre for Defense Research and Development. All Right Recieved</div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
