import React, { useState } from 'react';
import './css/login.css'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
    const csrfToken = csrfTokenMeta ? csrfTokenMeta.content : ''; // Safely get the CSRF token

    const response = await fetch('http://localhost:8088/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken, 
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      setErrors(data.errors || ['Invalid credentials']);
    } else {
      const data = await response.json();
      if (data.statusCode === 500) {
        alert("Invalid credentials");
      } else {
        if (data.role === "ADMIN") {
          navigate('/admin-dashboard'); // Navigate to the admin page
        }
        else if (data.role === "CLERK") {
          navigate('/clerk-dashboard');
        }
        else {
          alert("Not authorized for this action");
        }
      }
    }
  };

  return (
    <div className="log-page1">
      <header>
        <img src="/crd logo.png" alt="CRD Logo" className="log-logo1" />
      </header>

      <main>
        <section className="log-login-section">
          <h2 className="log-header2">Login</h2>
          {errors.length > 0 && (
            <div className="error">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="log-form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="log-form-group">
              <label htmlFor="password">Password:</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={togglePasswordVisibility}
                  aria-label="Toggle password visibility"
                >
                  <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                </button>
              </div>
            </div>
            <div className='login-btn'>
              <button type="submit" className="log-login-button">Login</button>
            </div>
          </form>

        </section>
      </main>
    </div>
  );
};

export default Login;
