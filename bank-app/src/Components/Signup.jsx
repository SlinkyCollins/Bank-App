import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { LoadingButton } from '@mui/lab';
import bgImg from "../assets/bg-img.jpg";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();
    const URL = 'http://localhost:5000/host/register';
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            firstName: Yup
                .string()
                .required("Please enter your first name")
                .max(15, "must be 15 characters or less")
                .min(3, "must be 3 characters or more"),
            lastName: Yup
                .string()
                .required("Please enter your last name")
                .max(15, "must be 15 characters or less")
                .min(3, "must be 3 characters or more"),
            email: Yup.string().email("Enter in the format: name@example.com").required("Email Address is Required"),
            password: Yup
                .string()
                .min(6, "Password must be six or more characters")
                .required("Password is Required")
        }),
        onSubmit: (values, { setSubmitting }) => {
            if (values.firstName === "" || values.lastName === "" || values.email === "" || values.password === "") {
                console.log("Please fill in the values");
                return;
            }
            setSubmitting(true); // start submission

            axios.post(URL, values)
                .then((response) => {
                    console.log(response);
                    setTimeout(() => {
                        toast.success('Signed up successfully')
                    }, 500);
                    console.log("User saved successfully");
                    navigate("/login");
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("User already exists, please try again");
                })
                .finally(() => {
                    setSubmitting(false); //  End submission
                });
        }
    });

    return (
        <div style={{ display: "flex" }}>
            <div style={{width: "50%", color: "#fff" }}>
                <div className="bg-image">
                    <img src={bgImg} style={{ width: "100%", height: "100vh", objectFit: "cover" }} />
                </div>
                <div style={{ position: "absolute", top: "0", left: "0", padding: "3rem 0 0 5rem" }}>
                    <h1 style={{ fontSize: "2rem", fontWeight: "600" }}><Link to="/" style={{textDecoration: "none", color: "inherit"}}>NairaNest</Link></h1>
                </div>
                <div style={{ position: "absolute", width: "50%", top: "50%", left: "50%", transform: "translate(-100%, -50%)", padding: "0 0 0 5rem" }}>
                    <div>
                        <h1 style={{ fontSize: "2.6rem", fontWeight: "600" }}>Get Verified!</h1>
                        <p style={{ fontSize: "1rem", marginTop: "1rem", width: "90%" }}>Every day, NairaNest makes thousands of customers happy.</p>
                    </div>
                </div>
            </div>
            <div style={{ minHeight: "100vh", width: "50%", color: "#000", textAlign: "left", display: "flex", justifyContent: "center", alignItems: "center", margin: "0" }}>
                <div>
                    <h1 style={{ fontSize: "1.7rem", marginBottom: "1rem" }}>Sign Up</h1>
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
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            variant="outlined"
                            margin="normal"
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName ? (
                                <span><ErrorOutlineIcon fontSize='10px' style={{marginTop: "-2px"}} /> {formik.errors.firstName}</span>
                            ) : null}
                        />


                        <TextField
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                            onBlur={formik.handleBlur}
                            variant="outlined"
                            margin="normal"
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName ? (
                                <span><ErrorOutlineIcon fontSize='10px' style={{marginTop: "-2px"}} /> {formik.errors.lastName}</span>
                            ) : null}
                        />

                        <TextField
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            variant="outlined"
                            margin="normal"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email ? (
                                <span><ErrorOutlineIcon fontSize='10px' style={{marginTop: "-2px"}} /> {formik.errors.email}</span>
                            ) : null}
                            
                        />

                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            margin="normal"
                            value={formik.values.password}
                            onChange={formik.handleChange}
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
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password ? (
                                <span><ErrorOutlineIcon fontSize='10px' style={{marginTop: "-2px"}} /> {formik.errors.password}</span>
                            ) : null}
                            
                        />

                        <LoadingButton 
                        loading={formik.isSubmitting} 
                        style=
                        {{ backgroundColor: "#2dbe60",
                         width: "100%",
                          margin: "1rem 0",
                          padding: ".8rem 0",
                          fontWeight: "700"
                        }} 
                        variant="contained" 
                        type='submit'
                        >
                        Sign Up
                        </LoadingButton>

                    </Box>
                    <p style={{ color: "#92a4af", textAlign: "center" }}>Already have an account? <Link to="/login" style={{textDecoration: "none", color: "inherit"}}><span style={{ color: "#2dbe60" }}  className='link'>Login</span></Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup;
