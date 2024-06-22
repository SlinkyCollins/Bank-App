import './App.css'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import { Toaster } from "react-hot-toast";
import Homepage from './Components/Pages/Homepage';
import Login from './Components/Login';
import FullPageLoader from './Components/FullPageLoader';
import { useEffect, useState } from 'react';
import ResetPassword from './Components/ResetPassword';
import ForgotPassword from './Components/ForgotPassword';
import ResetSuccess from './Components/resetSucess';




function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
 
  useEffect(() => {
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Check token expiration
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('token');
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  if (loading) {
    return <FullPageLoader />;
  }
  console.log("App component rendered");
  // let token = localStorage.getItem("token")
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/home" element={<Navigate to="/"/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess/>} />
        {/* <Route path="/dashboard" element={token ? <Navigate to="/dashboard"/> : <Navigate replace to="/login"/>}/> */}
      </Routes>  
    </>
  )
}

export default App