// PrivateRoute.js
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ token, children }) => {
  
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // Redirect to login if neither token nor isAuthenticated are set
  return token && isAuthenticated ? children : <Navigate replace to="/login" />;

};

export default PrivateRoute;
