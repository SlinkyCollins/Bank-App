import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import "./ResetForms.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const { token } = useParams();
  const URL = "https://bank-app-6lyo.onrender.com/host/reset-password"; // Update this to your deployed backend URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(URL, { token, newPassword });
      toast.success("Password reset successful");
      console.log(response.data.message);
      if (response.data && response.data.message === "Password reset successful") {
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = 'https://bank-app-livid-seven.vercel.app/login'; // Redirect using window.location
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        toast.error("Error resetting password");
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
