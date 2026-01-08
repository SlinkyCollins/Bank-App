import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

// Module-level flag to prevent duplicate toasts across all PrivateRoute instances
let hasShownAuthToast = false;

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!isAuthenticated && !hasShownAuthToast) {
    toast.error("Please log in to access this page.");
    hasShownAuthToast = true;
    return <Navigate replace to="/login" />;
  }

  return children;
};

export default PrivateRoute;