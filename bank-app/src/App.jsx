import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Dashboard from './Components/Dashboard';

function App() {
  let token = localStorage.getItem("token")
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/dashboard" element={token ? <Dashboard/> : <Navigate to="/signin" />}/>
      </Routes>  
    </>
  )
}

export default App
