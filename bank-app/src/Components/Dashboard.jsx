import axios  from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
// import React, { useState } from 'react';
// import BootstrapModal from './BootstrapModal';

const Dashboard = () => {
    // const [showModal, setShowModal] = useState(false);
    let navigate = useNavigate();
    // const handleLogin = () => {
    //     // Handle login action
    //     setShowModal(false); // Close the modal after login
    //   };
    useEffect(() => {
        let URL = "http://localhost:5000/host/dashboard"
        let token = localStorage.getItem("token");
        axios
        .get(URL, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
        .then((res) => {
            if (res.data.status === true) {
                console.log("Success");
            } else {
                localStorage.removeItem("token");
                navigate("/signin");
                console.log(res.status);
                console.log("Error, please try again");
                // setShowModal(true); 
                // return
            }
        })
    }, [])
  return (
    <div>
        <h1 className="text-underline">
            Welcome to the Dashboard
        </h1>
        <button>Logout</button>
         {/* <button onClick={() => setShowModal(true)}>Show Modal</button>
      <BootstrapModal show={showModal} onClose={handleLogin} /> */}
    </div>
  )
}

export default Dashboard