import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast"
import "./ResetForms.css";
import FullPageLoader from "./FullPageLoader";
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [loading, setLoading] = useState(true);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const URL = "https://bank-app-6lyo.onrender.com/host/forgot-password";

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingBtn(true);

        try {
            const response = await axios.post(URL, { email });
            console.log(response.data.message);
            toast.success("Password reset email sent");
            navigate("/checkEmail", { state: {email} });
        } catch (error) {
            if (error.response.status === 404) {
                console.log(error.response.data.message); // Log the error message if it exists
                toast.error("User is not found"); // Display the error message to the user
            } else if (error.request)  {
                console.log(error.request); 
                toast.error("Network error. Please check your connection.");
            } else  {
                console.log(error); // Log the entire error object for debugging
                toast.error("An unexpected error occurred. Please try again later.");
            }
        } finally {
            setLoadingBtn(false);
        }
    };

    if (loading) {
        return <FullPageLoader />;
    }

    return (

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", margin: "0 1rem" }}>
            <div className="form-container" style={{padding: "32px 55px 20px 55px", width: "100%", maxWidth: "600px"}}>
                <div className="logo-container">
                    <h1 style={{ color: "#2dbe60", fontSize: "1.65rem" }}>Forgot your password?</h1>
                    <p style={{color: "#78838f", fontSize: ".9rem", fontWeight: "500", margin: "1rem 0 .4rem"}}>Your password will be reset by email.</p>
                </div>


                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group" style={{margin: ".5rem 0 1rem 0"}}>
                        <label htmlFor="email" style={{fontSize: ".9rem", fontWeight: "500", color: "#78838f"}}>Enter your email address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=""
                            required />
                    </div>

                    <LoadingButton 
                        className="form-submit-btn" 
                        type="submit"
                        disabled={loadingBtn}
                    >
                        {loadingBtn ? "Processing..." : "Submit"}
                    </LoadingButton>

                    <Link 
                    to="/login"
                    style=
                    {{ 
                    textDecoration: "none",
                    color: "inherit" 
                    }}>
                    <button 
                    className="form-submit-btn2" 
                    >
                        Back to log in 
                    </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;