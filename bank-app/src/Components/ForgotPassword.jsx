import { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast"
import "./ResetForms.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const URL = "http://localhost:5000/host/forgot-password";

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(URL, { email });
            console.log(response.data.message);
            toast.success("Password reset email sent");
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message); // Log the error message if it exists
                toast.error("Error sending reset email"); // Display the error message to the user
            } else {
                console.log(error); // Log the entire error object for debugging
                toast.error("An unexpected error occurred. Please try again later.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />
            <button type="submit">Send Reset Link</button>
        </form>
    );
};

export default ForgotPassword;