import axios from "axios"
import { useFormik } from "formik"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';


const Signin = () => {
  const navigate = useNavigate()
  const URL = "http://localhost:5000/host/login"
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, {setValues}) => {
      if(values.email === "" || values.password === "") {
        console.log("Please enter the values");
    }
    const errors = {};
    if(!values.email){
      errors.email = "Required";
      console.log("Email is required");
    } else {
      console.log(values);
      axios.post(URL, values)
      .then((response) => {
        console.log(response);
        if(response.data && response.data.user) {
          console.log("User login successful");
          toast.success("User login successful")
          let token = response.data.token
          localStorage.setItem("token", token)
          console.log(token);
          navigate("/dashboard")
          setValues({
            ...values,
            email: "",
            password: "",
          })
        } else {
          console.log("User not found");
          toast.error("User not found");
        }
      })
      .catch((err)=>{
        console.log(err);
        console.log('wrong credentials');
        toast.error(err);
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
        <Toaster/>
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