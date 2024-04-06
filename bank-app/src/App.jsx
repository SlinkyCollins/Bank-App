import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from './Components/Signup';
import Signin from './Components/Signin';

function App() {

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
      </Routes>  
    </>
  )
}

export default App
