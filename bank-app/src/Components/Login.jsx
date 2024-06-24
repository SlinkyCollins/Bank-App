import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Grid, IconButton, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useEffect } from 'react';
import "../Components/Login.css"
import banking1 from "../assets/banking1.jpg";
import FullPageLoader from './FullPageLoader';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const Login = () => {
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLockedOut, setIsLockedOut] = useState(false);
    const [lockoutTimer, setLockoutTimer] = useState(0);
    const [lockoutMessage, setLockoutMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');

    useEffect(() => {
        // Simulate a network request
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);


    useEffect(() => {
        const email = localStorage.getItem('email');
        const rememberMe = localStorage.getItem('rememberMe') === 'true';

        if (email && rememberMe) {
            formik.setFieldValue('email', email);
            setRememberMe(rememberMe);
        }
    }, []);

    useEffect(() => {
        let timer;
        if (lockoutTimer > 0) {
            timer = setTimeout(() => setLockoutTimer(lockoutTimer - 1), 1000);
        } else {
            setIsLockedOut(false);
        }
        return () => clearTimeout(timer);
    }, [lockoutTimer]);

    useEffect(() => {
        if (lockoutMessage) {
            // Set a timer to clear the lockoutMessage after 30 seconds
            const timer = setTimeout(() => {
                setLockoutMessage('');
            }, 30000);

            // Return a cleanup function that clears the timer
            return () => clearTimeout(timer);
        }
    }, [lockoutMessage]);


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    }

    const navigate = useNavigate();

    const URL = "https://bank-app-6lyo.onrender.com/host/login";
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Enter a valid email").required("Email is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);  // Start submission

            axios.post(URL, values)
                .then((response) => {
                    if (response.data && response.data.user) {
                        toast.success("Login successful");
                        // console.log(response.data.user);
                        let token = response.data.token;
                        localStorage.setItem("token", token);
                        // const decodedToken = jwtDecode(token);
                        // console.log('Decoded token', decodedToken);
                        // console.log('Logged in user:', decodedToken.id);
                        if (rememberMe) {
                            localStorage.setItem("rememberMe", "true");
                            localStorage.setItem("email", values.email);
                        }
                        else {
                            localStorage.removeItem("email");
                            localStorage.removeItem("rememberMe");
                        }
                        navigate("/dashboard");
                    } else {
                        toast.error("User not found, please sign up");
                    }
                })
                .catch((err) => {
                    if (err.response && err.response.status === 404) {
                        setWarningMessage(err.response.data.warning); // set warning message
                        toast.error("User not found, please sign up");
                    } else if (err.response && err.response.status === 403) {
                        setWarningMessage(err.response.data.warning); // set warning message
                        toast.error("Invalid credentials, please try again");
                    } else if (err.response && err.response.status === 429) {
                        const retryAfter = Math.floor(err.response.data.retryAfter / 1000); // convert milliseconds to seconds
                        setIsLockedOut(true);
                        setLockoutTimer(retryAfter);
                        // toast.error(`Too many login attempts. Please try again in ${retryAfter} seconds.`);
                        toast.error(`Too many login attempts. Please try again later.`);
                        setLockoutMessage(err.response.data.message);  // Set lockout message
                    } else {
                        toast.error("An error occurred. Please try again later.");
                    }
                })
                .finally(() => {
                    setSubmitting(false);  // End submission
                });
        },
    });
    if (loading) {
        return <FullPageLoader />;
    }
    return (
        <Grid container sx={{ height: "100vh" }} className='logingridcontainer'>
            <Grid item xs={12} md={6} sx={{ color: "#fff" }} className='logingriditem1'>
                <div className="bg-image" style={{ height: "23rem" }}>
                    <LazyLoadImage
                        effect="blur"
                        src={banking1} // Replace with your image source
                        width="100%"
                        height="100%"
                        style=
                        {{ 
                            objectFit: "cover"
                        }}
                    />
                </div>
                <Box className="logoWrapper" sx={{ position: "absolute", textAlign: "left", top: "0", left: "0", right: "0", maxWidth: "100%", padding: "3rem 2rem 0 2rem" }}>
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        <h1 className='nairanest-login-logo' style={{ fontSize: "1.6rem", marginBottom: "5rem" }}>NairaNest</h1>
                    </Link>
                    <Box className="loginTextWrapper">
                        <h1 className='login-header' style={{ fontSize: "1.5rem", fontWeight: "600" }}>Welcome back!</h1>
                        <p className='login-paragraph' style={{ fontSize: "1.1rem", marginTop: "2rem", lineHeight: "1.5rem", fontWeight: "500" }}>We are glad to see you again! Instant deposits, withdrawals & payouts trusted by millions worldwide.</p>
                    </Box>
                </Box>
            </Grid>

            <Grid className='logingriditem2' item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f5f6', minHeight: "60%" }}>
                <Box sx={{ width: '90%', maxWidth: 500 }}>
                    <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: "500" }}>Log In</h1>
                    {lockoutMessage && <div style={{ color: 'red', marginBottom: '1rem' }}>{lockoutMessage}</div>}  {/* Display lockout message */}
                    {warningMessage && <div style={{ color: 'orange', marginBottom: '1rem' }}>{warningMessage}</div>}  {/* Display warning message */}
                    <Box
                        onSubmit={formik.handleSubmit}
                        component="form"
                        sx={{
                            width: '100%',
                        }}
                    >
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />

                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            margin="normal"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: ".5rem 0" }}>
                            <FormControlLabel
                                control={<Checkbox size='small' checked={rememberMe} onChange={handleRememberMeChange} />}
                                label="Remember Me"
                                value="Remember Me"
                            />
                            <Link to="/forgot-password" style={{ color: "#2dbe60", fontSize: ".9rem", textDecoration: "none" }}>Forgot Password?</Link>
                        </Box>
                        <LoadingButton
                            style={{
                                backgroundColor: isLockedOut ? "#ccc" : "#2dbe60",
                                width: "100%",
                                marginBottom: "1rem",
                                padding: ".8rem 0",
                                fontWeight: "700",
                            }}
                            type='submit'
                            variant="contained"
                            loading={formik.isSubmitting || isLockedOut}
                            loadingIndicator={isLockedOut ? `Try again in ${lockoutTimer}s` : "Loading..."}
                            disabled={formik.isSubmitting || isLockedOut || !formik.isValid}
                        >
                            Login
                        </LoadingButton>

                    </Box>
                    <p style={{ color: "#92a4af", textAlign: "center", fontSize: ".9rem" }}>Don&#39;t have an account? <Link to="/signup" style={{ textDecoration: "none", color: "inherit" }}><span style={{ color: "#2dbe60" }} className='link' >Sign Up</span></Link></p>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login