// ResetPassword.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import "./ResetForms.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const { token } = useParams();
  const URL = "https://bank-app-6lyo.onrender.com/host/reset-password";
//   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(URL, { token, newPassword });
      toast.success("Password reset successful");
      console.log(response.data.message);
      if (response.data && response.data.message === "Password reset successful") {

          // Navigate to reset success page after 2 seconds
        //   setTimeout(() => {
        //     navigate('/reset-success');
        //   }, 2000);
          setTimeout(() => {
            window.location.href = 'http://localhost:5173/'; // Redirect using window.location
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
