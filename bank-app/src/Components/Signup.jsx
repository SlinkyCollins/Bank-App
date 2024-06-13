import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik";
import  axios from "axios";
import * as Yup from "yup";
import toast from 'react-hot-toast';

const Signup = () => {
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
            .required("First name is required")
            .max(15, "must be 15 characters or less")
            .min(3, "must be 3 characters or more"),
            lastName: Yup
            .string()
            .required("Last name is required")
            .max(15, "must be 15 characters or less")
            .min(3, "must be 3 characters or more"),
            email: Yup.string().email("Invalid Email Address").required("Email Address is Required"),
            password: Yup
            .string()
            .min(8, "must be at least 8 characters")
            .required("Password is Required")
        }),
        onSubmit: (values) => {
            if(values.firstName === "" || values.lastName === "" || values.email === "" || values.password === "" ) {
                console.log("Please fill in the values");
            }
            const errors = {};
            if (values.firstName) {
                errors.firstName = "Required";
                console.log("First name Required");
            } else if (values.firstName.length > 15) {
                errors.firstName = "Must be 15 characters or less";
                console.log("Must be 15 characters or less");
            }
            if (!values.lastName) {
                errors.lastName = "Last name Required";
            } else if (values.lastName.length > 15) {
                errors.lastName = "Must be 15 characters or less";
                console.log("Must be 15 characters or less");
            }
            if(!values.email) {
                errors.email = "Email Required";
                console.log("Email is Required");
            } 

            else {
                console.log(values);
                axios.post(URL, values)
                .then((response) => {
                    console.log(response);
                    setTimeout(() => {
                        toast.success('Signed up')
                    }, 500);
                    console.log("User saved successfully");
                    navigate("/Signin");
                })
                .catch((err)=> {
                    console.log(err);
                    toast.error("Error saving user");
                })
            }
        }
    });
    return (
        <div className="form-container">
            <div className="logo-container">
                Sign up
            </div>

            <form onSubmit={formik.handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                    onBlur={formik.handleBlur}
                    type='text' 
                    id='firstName' 
                    name='firstName' 
                    placeholder='Enter first name' 
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                        <div className="text-red-500">{formik.errors.firstName}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                    onBlur={formik.handleBlur}
                    type='text' 
                    id='lastName' 
                    name='lastName' 
                    placeholder='Enter last name' 
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                        <div className="text-red-500">{formik.errors.lastName}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    onBlur={formik.handleBlur}
                    type='email' 
                    id='email' 
                    name='email' 
                    placeholder='Enter your email' 
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Password</label>
                    <input 
                    onBlur={formik.handleBlur}
                    type='password' 
                    id='password' 
                    name='password' 
                    placeholder='Enter your password'
                    onChange={formik.handleChange} 
                    value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500">{formik.errors.password}</div>
                    ) : null}
                </div>

                <button className="form-submit-btn" type="submit">Sign Up</button>
            </form>

            <p className="signup-link">
                Already have an account?
                <span className="text-blue-500 hover:underline"><Link to="/login"> Sign in</Link></span>
            </p>
        </div>
    )
}

export default Signup