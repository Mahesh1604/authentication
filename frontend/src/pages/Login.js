import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const params = new URLSearchParams();
    params.append('username', email); // Using email as username as per the curl example
    params.append('password', password);
    params.append('grant_type', '');
    params.append('scope', '');
    params.append('client_id', '');
    params.append('client_secret', '');
    
    try {
      const res = await axios.post('http://127.0.0.1:8000/login', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json'
        }
      });
      
      if (res.data.access_token) {
        localStorage.setItem('token', res.data.access_token);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your account</p>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input 
            type="email" 
            className="form-input" 
            placeholder="Enter your email"
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-input" 
            placeholder="Enter your password"
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
        </div>
        
        <button 
          type="submit" 
          className={`auth-button ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      
      <div className="auth-links">
        <Link to="/signup" className="auth-link">Create Account</Link>
        <span className="link-separator">•</span>
        <Link to="/forgot-password" className="auth-link">Forgot Password?</Link>
      </div>
    </div>
  );
}

export default Login;
