// src/Login.js
import React, { useState } from 'react';
import './login.css'; // Make sure this path is correct

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/login', { // Adjust this endpoint as needed
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content, // CSRF token for Laravel
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      setErrors(data.errors || ['Invalid credentials']);
    } else {
      // Handle successful login (e.g., redirect or update state)
      console.log('Login successful');
    }
  };

  return (
    <div className="page1">
      <header>
      <img src="/crd logo.png" alt="CRD Logo" className="logo1" />
      </header>

      <main>
        <section className="login-section">
          <h2 className="header2">Login</h2>
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
            <button type="submit" className="login-button">Login</button>
          </form>

          <p>Don't have an account? <a href="/register">Register here</a></p>
        </section>
      </main>
    </div>
  );
};

export default Login;

