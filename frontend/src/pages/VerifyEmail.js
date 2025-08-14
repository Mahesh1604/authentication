
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function VerifyEmail() {
  const [message, setMessage] = useState('Verifying...');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    axios.get(`http://localhost:5000/api/auth/verify-email?token=${token}`)
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage(err.response?.data?.message || 'Verification failed'));
  }, [location]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2>Email Verification</h2>
          <div className="alert alert-info">{message}</div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
