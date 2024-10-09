// PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // Redirect to login if not authenticated
  return isAuthenticated ? children : <Navigate replace to="/login" />;
};

export default PrivateRoute;
