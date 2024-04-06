import { Link } from "react-router-dom"

const Signup = () => {
    return (
        <div className="form-container">
                <div className="logo-container">
                    Sign up
                </div>

                <form className="form">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type='text' id='firstName' name='firstName' placeholder='Enter first name' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type='text' id='lastName' name='lastName' placeholder='Enter last name' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type='email' id='email' name='email' placeholder='Enter your email' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Password</label>
                        <input type='password' id='password' name='password' placeholder='Enter your password' required />
                    </div>

                    <button className="form-submit-btn" type="submit">Sign Up</button>
                </form>

                <p className="signup-link">
                    Already have an account?
                    <Link to="/signin"><a className="signup-link link"> Sign in</a></Link>
                </p>
        </div>
    )
}

export default Signup