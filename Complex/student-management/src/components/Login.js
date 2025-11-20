import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('sms_users') || '[]');
    const user = existing.find(u => u.username === username && u.password === password);
    if (user) {
      // store a simple logged-in flag
      localStorage.setItem('sms_currentUser', JSON.stringify({ username }));
      alert('Login successful!');
      // In a real app you'd go to dashboard; for now stay on same app or navigate to about
      navigate('/about');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
