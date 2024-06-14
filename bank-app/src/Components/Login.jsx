import { useState } from 'react';
import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    const URL = "http://localhost:5000/host/login";
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
                        let token = response.data.token;
                        localStorage.setItem("token", token);
                        navigate("/dashboard");
                    } else {
                        toast.error("User not found, please sign up");
                    }
                })
                .catch((err) => {
                    if (err.response && err.response.status === 404) {
                        toast.error("User not found, please sign up");
                    } else if (err.response && err.response.status === 403) {
                        toast.error("Invalid credentials, please try again");
                    } else {
                        toast.error("An error occurred. Please try again later.");
                    }
                })
                .finally(() => {
                    setSubmitting(false);  // End submission
                });
        },
    });

    return (
        <div style={{ display: "flex" }}>
            <div style={{  width: "50%", color: "#fff" }}>
                <div className="bg-image">
                    <img src="/src/assets/banking (20).jpg" style={{ width: "100%", height: "100vh", objectFit: "cover" }} />
                </div>
                <div style={{ position: "absolute", top: "0", left: "0", padding: "3rem 0 0 5rem", cursor: "pointer" }}>
                    <Link to="/" style={{textDecoration: "none", color: "inherit"}}><h1 style={{ fontSize: "2rem", fontWeight: "600" }}>NairaNest</h1></Link>
                </div>
                <div style={{ position: "absolute", width: "50%", top: "50%", left: "50%", transform: "translate(-100%, -50%)", padding: "0 0 0 5rem" }}>
                    <div>
                        <h1 style={{ fontSize: "2.6rem", fontWeight: "600" }}>Welcome back!</h1>
                        <p style={{ fontSize: "1.1rem", marginTop: "1.5rem", width: "90%", lineHeight: "1.5rem" }}>We are glad to see you again! Instant deposits, withdrawals & payouts trusted by millions worldwide.</p>
                    </div>
                </div>
            </div>
            <div style={{ minHeight: "100vh", width: "50%", color: "#000", backgroundColor: "#f1f5f6", textAlign: "left", display: "flex", justifyContent: "center", alignItems: "center", margin: "0" }}>
                <div>
                    <h1 style={{ fontSize: "1.7rem", marginBottom: "1rem" }}>Log In</h1>
                    <Box
                        onSubmit={formik.handleSubmit}
                        component="form"
                        sx={{
                            width: 500,
                            maxWidth: '100%',
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

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: ".5rem 0" }}>
                            <div style={{ color: "#685665" }}>
                                <FormControlLabel
                                    control={<Checkbox size='small' />}
                                    label="Remember Me"
                                    value="Remember Me"
                                />
                            </div>
                            <div>
                                <p style={{ color: "#2dbe60", fontSize: ".9rem", cursor: "pointer" }}>Forgot Password ?</p>
                            </div>
                        </div>
                         <LoadingButton
                            style={{
                                backgroundColor: "#2dbe60",
                                width: "100%",
                                marginBottom: "1rem",
                                padding: ".8rem 0",
                                fontWeight: "700"
                            }}
                            type='submit'
                            variant="contained"
                            loading={formik.isSubmitting}
                            loadingIndicator="Loading…"
                        >
                            Login
                        </LoadingButton>

                    </Box>
                    <p style={{ color: "#92a4af", textAlign: "center" }}>Don&#39;t have an account? <Link to="/signup" style={{textDecoration: "none", color: "inherit"}}><span style={{ color: "#2dbe60" }}  className='link' >Sign Up</span></Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
