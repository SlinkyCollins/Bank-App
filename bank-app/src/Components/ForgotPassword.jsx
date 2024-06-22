import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast"
import "./ResetForms.css";
import FullPageLoader from "./FullPageLoader";
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const URL = "https://bank-app-6lyo.onrender.com/host/forgot-password";

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(URL, { email });
            console.log(response.data.message);
            toast.success("Password reset email sent");
        } catch (error) {
            if (error.response.status === 404) {
                console.log(error.response.data.message); // Log the error message if it exists
                toast.error("User is not found"); // Display the error message to the user
            } else {
                console.log(error); // Log the entire error object for debugging
                toast.error("An unexpected error occurred. Please try again later.");
            }
        }
    };

    if (loading) {
        return <FullPageLoader />;
    }

    return (

        // <div>
        //     <form onSubmit={handleSubmit}>
        //         <h2>Forgot Password</h2>
        //         <input
        //             type="email"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //             placeholder="Enter your email"
        //             required
        //         />
        //         <button type="submit">Send Reset Link</button>
        //     </form>

        //     <div>
        //         <img src="/src/assets/forgotpassword.gif" alt="" />
        //     </div>
        // </div>

        <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", margin: "0"}}>
            <div className="form-container">
                <div className="logo-container">
                    Forgot Password?
                </div>

                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required />
                    </div>

                    <button className="form-submit-btn" type="submit">Send Email</button>
                </form>

                <p className="signup-link">
                    Don&apos;t have an account?
                    <span className="signup-link link">
                        <Link to="/signup" style={{ textDecoration: "none", color: "inherit" }}> Sign up now</Link>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;