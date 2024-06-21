// ResetSuccess.jsx


import { Link } from 'react-router-dom';

const ResetSuccess = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Password Reset Successful</h2>
      <p>Your password has been reset successfully. You can now log in with your new password.</p>
      <Link to="/login">
        <button style={{ padding: '0.5rem 1rem', backgroundColor: '#2dbe60', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Go to Login
        </button>
      </Link>
    </div>
  );
};

export default ResetSuccess;
