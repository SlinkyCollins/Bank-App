import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./ResetForms.css";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();
    const URL = "https://bank-app-6lyo.onrender.com/host/reset-password"; // Update this to your deployed backend URL

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    }

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
                // Redirect to login page after 3 seconds
                setTimeout(() => {
                navigate("/reset-success", { replace: true });
                }, 3000);
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
                <div className="logo-container" style={{color: "#2dbe60"}}>
                    Reset Password
                </div>

                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group" style={{margin: "0 0 1rem"}}>
                        <label htmlFor="password">Password</label>
                        <div style={{position: "relative"}}>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter your new password"
                                required
                            />
                            <span onClick={togglePasswordVisibility} style={{position: "absolute", top: "0", right: "0", color: "#000", padding: "15px 15px 0px 0px", cursor: "pointer", fontSize: "1.3rem"}} title="Toggle password">{passwordVisible ? <VisibilityOff style={{color: "#3b3939"}}/>  : <Visibility style={{color: "#3b3939"}}/>}</span>
                        </div>
                    </div>

                    <div className="form-group" style={{margin: "0 0 .5rem"}}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div style={{position: "relative"}}>
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your new password"
                                required
                            />
                            <span onClick={toggleConfirmPasswordVisibility} style={{position: "absolute", top: "0", right: "0", color: "#000", padding: "15px 15px 0px 0px", cursor: "pointer", fontSize: "1.3rem"}} title="Toggle password">{confirmPasswordVisible ? <VisibilityOff style={{color: "#3b3939"}}/> : <Visibility style={{color: "#3b3939"}}/>}</span>
                        </div>
                    </div>

                    <button className="form-submit-btn" type="submit">Done!</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
