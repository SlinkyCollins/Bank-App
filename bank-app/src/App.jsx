import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from './Components/Signup';
import { Toaster } from "react-hot-toast";
import Homepage from './Components/Pages/Homepage';
import Login from './Components/Login';
import FullPageLoader from './Components/FullPageLoader';
import { useEffect, useState } from 'react';
import ResetPassword from './Components/ResetPassword';
import ForgotPassword from './Components/ForgotPassword';
import ResetSuccess from './Components/resetSucess';
import NotFound from './Components/NotFound';
import EmailCheck from './Components/EmailCheck';
// import ResDrawer from './Components/ResponsiveDrawer';
import Dashboard from './Components/NairaNestDashboard';
import Account from './Components/Account';
import Transactions from './Components/Transactions';
import Settings from './Components/Settings';
import MainDashboard from './Components/MainDashboard';
import PrivateRoute from './Components/PrivateRoute';
// import { useSelector } from "react-redux"; // Import if you need additional state for checking authentication




function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <FullPageLoader />;
  }
  console.log("App component rendered");
  let token = localStorage.getItem("token")
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/home" element={<Navigate to="/"/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<NotFound/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        {/* <Route path="/drawerr" element={<ResDrawer/>}/> */}
        <Route path="/checkEmail" element={<EmailCheck/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess/>} />
        <Route 
        path="/dashboard" 
        element={
        <PrivateRoute token={token}> 
          <Dashboard/>
        </PrivateRoute>
        }
        >
          <Route index element={<MainDashboard/>} />
          <Route path="account" element={<Account />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>  
    </>
  )
}

export default App