import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const { token } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/api/reset/${token}`);
        if (!response.data.success) {
          alert('Invalid or expired token');
          navigate('/');
        }
      } catch (error) {
        console.error(error);
      }
    }
    checkToken();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      return setMessage('Passwords do not match');
    }

    try {
      const response = await axios.post(`http://localhost:3500/api/reset/${token}`, { password }); // Use token directly
      console.log(response.data);
      if (response.data.success) {
        alert('Password reset successfully');
        navigate('/');
      } else {
        setMessage('An error occurred. Please try again later');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container"> 
      <div className="form"> 
        <h2 className="form-header">Enter New Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="password">
            <label htmlFor="password" className="floatLabel">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="confirm-password">
            <label htmlFor="confirm-password" className="floatLabel">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="submit-btn-container">
            <input type="submit" value="Reset Password"/>
          </div>
        </form>
        <div className="message">
          {message}
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;