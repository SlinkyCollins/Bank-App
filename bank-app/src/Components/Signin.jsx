import axios from "axios"
import { useFormik } from "formik"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import { useEffect } from "react";
// import { useHistory } from 'react-router-dom';


const Signin = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const sessionExpired = localStorage.getItem("sessionExpired");
    if (sessionExpired) {
      localStorage.removeItem("sessionExpired");
      // Display session expired message to the user
      toast.error("Session expired. Please log in again.")
      console.log("Session expired. Please log in again.");
    } else {
      const userLoggedOut = localStorage.getItem("userLoggedOut");
      if (userLoggedOut) {
        localStorage.removeItem("userLoggedOut");
        // Display "User logged out" message
      }
    }
  }, []);

  const URL = "http://localhost:5000/host/login"
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { setValues }) => {
      if (values.email === "" || values.password === "") {
        console.log("Please enter the values");
      }
      const errors = {};
      if (!values.email) {
        errors.email = "Required";
        console.log("Email is required");
      } else {
        console.log(values);
        axios.post(URL, values)
          .then((response) => {
            console.log(response);
            if (response.data && response.data.user) {
              console.log("User login successful");
              setTimeout(() => {
                toast.success("Login successful")
              }, 500)
              navigate("/dashboard")
              let token = response.data.token
              localStorage.setItem("token", token)
              console.log(token);
              setValues({
                ...values,
                email: "",
                password: "",
              })
            } else {
              console.log("User not found");
              toast.error("User not found, please sign up");
            }
          })
          .catch((err) => {
            toast.error("Wrong email or password");
            console.log(err);
            console.log('wrong credentials');
          })
        values.email = "";
        values.password = "";
      }
    },
  });
  return (
    <div className="form-container">
      <div className="logo-container">
        Sign in
      </div>

      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type='email'
            id='email'
            name='email'
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder='Enter your email'
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type='password'
            id='password'
            name='password'
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder='Enter your password'
          />
        </div>

        <button className="form-submit-btn" type="submit">Login</button>
      </form>

      <p className="signup-link">
        Don&apos;t have an account?
        <Link to="/signup"><a className="signup-link link"> Sign up now</a></Link>
      </p>
    </div>
  )
}

export default Signin