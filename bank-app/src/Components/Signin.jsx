import { Link } from "react-router-dom"

const Signin = () => {
  return (
    <div className="form-container">
      <div className="logo-container">
        Sign in
      </div>

      <form className="form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type='email' id='email' name='email' placeholder='Enter your email' required />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">Password</label>
          <input type='password' id='password' name='password' placeholder='Enter your password' required />
        </div>

        <button className="form-submit-btn" type="submit">Sign Up</button>
      </form>

      <p className="signup-link">
        Don&apos;t have an account?
        <Link to="/signup"><a className="signup-link link"> Sign up now</a></Link>
      </p>
    </div>
  )
}

export default Signin