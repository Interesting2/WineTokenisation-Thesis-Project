import { useState } from 'react';
import axios from 'axios';
import { useNavigate} from "react-router-dom";

function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const submitRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3500/api/request-reset', { email });
      console.log(response.data);
      // assuming server returns a success message
      if (response.data.success) {
        alert('Please check your email for a password reset link');
        navigate('/');
      } else {
        alert('An error occurred. Please try again later');
      }
    } catch (error) {
      alert('An error occurred. Please try again later');
      console.error(error);
    }
  }

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="container"> 
      <div className="form"> 
        <h2 className="form-header">Reset Password</h2>
        <form onSubmit={submitRequest}>
          <div className="email">
            <label htmlFor="email" className="floatLabel">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="submit-btn-container">
            <input type="submit" value="Send me Reset Email"/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;