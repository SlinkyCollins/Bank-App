import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Grid, IconButton, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { LoadingButton } from '@mui/lab';
import bgImg from "../assets/bg-img.jpg";
import "../Components/Signup.css"


const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();
    const URL = 'https://bank-app-6lyo.onrender.com/host/register';
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
                    console.log("User saved successfully");
                    toast.success('Signed up successfully');
                    navigate("/login");
                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.status === 409) {
                            toast.error("User already exists. Please use a different email or try logging in.");
                        } else if (error.response.status === 500) {
                            toast.error("Registration failed. Please try again later.");
                        } else {
                            toast.error("An error occurred. Please try again later.");
                        }
                    } else if (error.request) {
                        // The request was made but no response was received
                        toast.error("Network error. Please check your connection and try again.");
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        toast.error("An unexpected error occurred. Please try again.");
                    }
                })
                .finally(() => {
                    setSubmitting(false); //  End submission
                });
        }
    });
    return (
        <Grid container sx={{height: "100vh"}} className='signupgridcontainer'>
            <Grid item xs={12} md={6} sx={{ color: "#fff" }} className='signupgriditem1'>
                <div className="bg-image" style={{height: "23rem"}}>
                    <img src={bgImg} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <Box className="logoWrapper" sx={{ position: "absolute", textAlign: "left", top: "0", left: "0", right: "0", width: "100%", padding: "3rem 2rem 0 2rem" }}>
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        <h1 className='nairanest-signup-logo' style={{ fontSize: "1.6rem", marginBottom: "5rem" }}>NairaNest</h1>
                    </Link>
                    <Box className="signupTextWrapper">
                        <h1 className='signup-header' style={{ fontSize: "1.5rem", fontWeight: "600" }}>Get Verified!</h1>
                        <p className='signup-paragraph' style={{ fontSize: "1.1rem", marginTop: "2rem", lineHeight: "1.5rem", fontWeight: "500" }}>Every day, NairaNest makes thousands of customers happy.</p>
                    </Box>
                </Box>
            </Grid>

            <Grid className='signupgriditem2' item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f5f6', minHeight: "60%", padding: "2rem 0"}}>
                <Box sx={{ width: '90%', maxWidth: 500 }}>
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
                </Box>
            </Grid>
        </Grid>
    )
}

export default Signup































// import { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { IconButton, InputAdornment } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom"
// import { useFormik } from "formik";
// import axios from "axios";
// import * as Yup from "yup";
// import toast from 'react-hot-toast';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import { LoadingButton } from '@mui/lab';
// import bgImg from "../assets/bg-img.jpg";
// import "../Components/Signup.css"

// const Signup = () => {
//     const [showPassword, setShowPassword] = useState(false);

//     const handleClickShowPassword = () => setShowPassword((show) => !show);

//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };

//     const navigate = useNavigate();
//     const URL = 'http://localhost:5000/host/register';
//     const formik = useFormik({
//         initialValues: {
//             firstName: '',
//             lastName: '',
//             email: '',
//             password: '',
//         },
//         validationSchema: Yup.object({
//             firstName: Yup
//                 .string()
//                 .required("Please enter your first name")
//                 .max(15, "must be 15 characters or less")
//                 .min(3, "must be 3 characters or more"),
//             lastName: Yup
//                 .string()
//                 .required("Please enter your last name")
//                 .max(15, "must be 15 characters or less")
//                 .min(3, "must be 3 characters or more"),
//             email: Yup.string().email("Enter in the format: name@example.com").required("Email Address is Required"),
//             password: Yup
//                 .string()
//                 .min(6, "Password must be six or more characters")
//                 .required("Password is Required")
//         }),
//         onSubmit: (values, { setSubmitting }) => {
//             if (values.firstName === "" || values.lastName === "" || values.email === "" || values.password === "") {
//                 console.log("Please fill in the values");
//                 return;
//             }
//             setSubmitting(true); // start submission

//             axios.post(URL, values)
//                 .then((response) => {
//                     console.log(response);
//                     setTimeout(() => {
//                         toast.success('Signed up successfully')
//                     }, 500);
//                     console.log("User saved successfully");
//                     navigate("/login");
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                     toast.error("User already exists, please try again");
//                 })
//                 .finally(() => {
//                     setSubmitting(false); //  End submission
//                 });
//         }
//     });

//     return (
//         <div style={{ display: "flex" }}>
//             <div style={{width: "50%", color: "#fff" }}>
//                 <div className="bg-image" style={{height: "100vh"}}>
//                     <img src={bgImg} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                 </div>
//                 <div style={{ position: "absolute", top: "0", left: "0", padding: "3rem 0 0 5rem" }}>
//                     <h1 style={{ fontSize: "2rem", fontWeight: "600" }}><Link to="/" style={{textDecoration: "none", color: "inherit"}}>NairaNest</Link></h1>
//                 </div>
//                 <div style={{ position: "absolute", width: "50%", top: "50%", left: "50%", transform: "translate(-100%, -50%)", padding: "0 0 0 5rem" }}>
//                     <div>
//                         <h1 style={{ fontSize: "2.6rem", fontWeight: "600" }}>Get Verified!</h1>
//                         <p style={{ fontSize: "1rem", marginTop: "1rem", width: "90%" }}>Every day, NairaNest makes thousands of customers happy.</p>
//                     </div>
//                 </div>
//             </div>

//             <div style={{ minHeight: "100vh", width: "50%", color: "#000", textAlign: "left", display: "flex", justifyContent: "center", alignItems: "center", margin: "0" }}>
//                 <div>
//                     <h1 style={{ fontSize: "1.7rem", marginBottom: "1rem" }}>Sign Up</h1>
//                     <Box
//                         onSubmit={formik.handleSubmit}
//                         component="form"
//                         sx={{
//                             width: 500,
//                             maxWidth: '100%',
//                         }}
//                     >
//                         <TextField
//                             fullWidth
//                             id="firstName"
//                             name="firstName"
//                             label="First Name"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.firstName}
//                             variant="outlined"
//                             margin="normal"
//                             error={formik.touched.firstName && Boolean(formik.errors.firstName)}
//                             helperText={formik.touched.firstName && formik.errors.firstName ? (
//                                 <span><ErrorOutlineIcon fontSize='10px' style={{marginTop: "-2px"}} /> {formik.errors.firstName}</span>
//                             ) : null}
//                         />


//                         <TextField
//                             fullWidth
//                             id="lastName"
//                             label="Last Name"
//                             name="lastName"
//                             onChange={formik.handleChange}
//                             value={formik.values.lastName}
//                             onBlur={formik.handleBlur}
//                             variant="outlined"
//                             margin="normal"
//                             error={formik.touched.lastName && Boolean(formik.errors.lastName)}
//                             helperText={formik.touched.lastName && formik.errors.lastName ? (
//                                 <span><ErrorOutlineIcon fontSize='10px' style={{marginTop: "-2px"}} /> {formik.errors.lastName}</span>
//                             ) : null}
//                         />

//                         <TextField
//                             fullWidth
//                             id="email"
//                             label="Email"
//                             name="email"
//                             variant="outlined"
//                             margin="normal"
//                             value={formik.values.email}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             error={formik.touched.email && Boolean(formik.errors.email)}
//                             helperText={formik.touched.email && formik.errors.email ? (
//                                 <span><ErrorOutlineIcon fontSize='10px' style={{marginTop: "-2px"}} /> {formik.errors.email}</span>
//                             ) : null}
                            
//                         />

//                         <TextField
//                             fullWidth
//                             id="password"
//                             name="password"
//                             label="Password"
//                             type={showPassword ? "text" : "password"}
//                             variant="outlined"
//                             margin="normal"
//                             value={formik.values.password}
//                             onChange={formik.handleChange}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton
//                                             aria-label='toggle password visibility'
//                                             onClick={handleClickShowPassword}
//                                             onMouseDown={handleMouseDownPassword}
//                                             edge="end"
//                                         >
//                                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                                         </IconButton>
//                                     </InputAdornment>
//                                 )
//                             }}
//                             onBlur={formik.handleBlur}
//                             error={formik.touched.password && Boolean(formik.errors.password)}
//                             helperText={formik.touched.password && formik.errors.password ? (
//                                 <span><ErrorOutlineIcon fontSize='10px' style={{marginTop: "-2px"}} /> {formik.errors.password}</span>
//                             ) : null}
                            
//                         />

//                         <LoadingButton 
//                         loading={formik.isSubmitting} 
//                         style=
//                         {{ backgroundColor: "#2dbe60",
//                          width: "100%",
//                           margin: "1rem 0",
//                           padding: ".8rem 0",
//                           fontWeight: "700"
//                         }} 
//                         variant="contained" 
//                         type='submit'
//                         >
//                         Sign Up
//                         </LoadingButton>

//                     </Box>
//                     <p style={{ color: "#92a4af", textAlign: "center" }}>Already have an account? <Link to="/login" style={{textDecoration: "none", color: "inherit"}}><span style={{ color: "#2dbe60" }}  className='link'>Login</span></Link></p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Signup;
