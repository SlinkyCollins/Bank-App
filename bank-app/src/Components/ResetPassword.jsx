// ResetPassword.jsx

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import "./ResetForms.css"

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const { token } = useParams();
  const URL = "http://localhost:5000/host/reset-password";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(URL, { token, newPassword });
      toast.success("Password reset successful");
      console.log(response.data.message);
    } catch (error) {
      if (error.response) {
        toast.error("Error resetting password ");
        console.log(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter your new password"
        required
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
