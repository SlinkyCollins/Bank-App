import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import { Toaster } from "react-hot-toast";
import Homepage from './Components/Pages/Homepage';
import Login from './Components/Login';



function App() {
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
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/dashboard" element={token ? <Navigate to="/dashboard"/> : <Navigate to="/login"/>}/>
      </Routes>  
    </>
  )
}

export default App
