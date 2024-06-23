import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "./ResetForms.css";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();
    const URL = "https://bank-app-6lyo.onrender.com/host/reset-password"; // Update this to your deployed backend URL

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(URL, { token, newPassword });
            toast.success("Password reset successful");
            console.log(response.data.message);
            if (response.data && response.data.message === "Password reset successful") {
                // Redirect to login page after 2 seconds
                setTimeout(() => {
                navigate("/reset-success");
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

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", margin: "0" }}>
            <div className="form-container">
                <div className="logo-container">
                    Reset Password
                </div>

                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter your new password"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your new password"
                            required
                        />
                    </div>

                    <button className="form-submit-btn" type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
