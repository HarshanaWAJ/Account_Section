// src/Register.js
import React, { useState } from 'react';
import './login.css'; // Reuse the styles from login.css
import './register.css'; // Import the new CSS file

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrors(['Passwords do not match']);
      return;
    }

    try {
      const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
      const csrfToken = csrfTokenMeta ? csrfTokenMeta.content : '';

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors(data.errors || ['Registration failed']);
      } else {
        setSuccess('Registration successful! You can log in now.');
        // Reset form or redirect as needed
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrors(['An error occurred. Please try again later.']);
    }
  };

  return (
    <div className="page1">
      <header>
        <img src="/crd logo.png" alt="CRD Logo" className="logo2" />
      </header>

      <main>
        <section className="login-section">
          <h2 className="header2">Register</h2>
          {errors.length > 0 && (
            <div className="error">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          {success && <div className="success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
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
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">Register</button>
          </form>

          <p>Already have an account? <a href="/login">Login here</a></p>
        </section>
      </main>
    </div>
  );
};

export default Register;
