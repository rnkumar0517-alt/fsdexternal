import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please fill both fields');
      return;
    }

    // Simple users store in localStorage (key: "sms_users")
    const existing = JSON.parse(localStorage.getItem('sms_users') || '[]');
    if (existing.find(u => u.username === username)) {
      alert('Username already exists');
      return;
    }
    existing.push({ username, password });
    localStorage.setItem('sms_users', JSON.stringify(existing));

    alert('Registered successfully. Please login.');
    navigate('/');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
