import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import "./Dashboard.css";

const Dashboard = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // let URL = "http://localhost:5000/host/dashboard";
    // let token = localStorage.getItem("token");
    // axios
    //   .get(URL, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //   })
    //   .then((res) => {
    //     if (res.data.status === true) {
    //       console.log("Success");
    //       console.log(res);
    //       document.getElementById("inner").innerText = res.data.user;
    //       // toast.success("User login successful");
    //     } else if (res.data.status !== true) {
    //       localStorage.removeItem("token");
    //       localStorage.setItem("sessionExpired", "true"); // Set session expired flag
    //       navigate("/signin");
    //       console.log(res.status);
    //       console.log("sessionExpired, please log in again");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     toast.error("An error occurred. Please try again later.");
    //   });

    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/host/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          // Handle error: user details not found in response
          console.error("User details not found in response");
          // toast.error("Error fetching user details");
        }
      } catch (error) {
        // Handle error: request failed
        console.error("Error fetching user details:", error);
        toast.error("Error fetching user details. Please try again later.");
        navigate("/signin");
      }
    };

    fetchUserDetails();
  }, [navigate]);

  // const LogOut = () => {
  //   localStorage.removeItem("sessionExpired");
  //   localStorage.setItem("userLoggedOut", "true");
  //   localStorage.removeItem("token");
  //   const toastId = toast.loading('Loading...');
  //   toast.dismiss(toastId);
  //   toast.success('Logged Out', {
  //     id: toastId,
  //   });
  //   console.clear();
  //   navigate("/signin");
  // }


  const handleLogout = async () => {
    // Show loading toast
    const loadingToastId = toast.loading("Logging out...");

    try {
      // Remove user-related data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("sessionExpired");
      
      //useLoggedOut = true;
      localStorage.setItem("userLoggedOut", "true");

      // Dismiss the loading toast
      setTimeout(() => {
        toast.dismiss(loadingToastId);
      }, 300)

      // Show success toast
      setTimeout(() => {
        toast.success("Logged out");
      }, 500)

      // Clear console
      console.clear();

      // Navigate to the signin page
      navigate("/signin");
    } catch (error) {
      // Dismiss the loading toast
      toast.dismiss(loadingToastId);

      // Show error toast
      toast.error("An error occurred while logging out. Please try again later.");

      // Log the error for debugging purposes
      console.error("Logout error:", error);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    
    // <div>
    //   <h1 className="text-underline">Welcome to the Dashboard</h1>
    //   {user ? (
    //     <div>
    //       <p>Name: {user.firstName} {user.lastName}</p>
    //       <p>Email: {user.email}</p>
    //       {/* Render other user details here */}
    //     </div>
    //   ) : (
    //     <div>
    //       <p>Name: Loading user details...</p>
    //       <p>Email: Loading user details...</p>
    //     </div>
    //   )}
    //   <button onClick={openModal}>Logout</button>
    //   <Modal show={showModal} onClose={closeModal} onConfirm={handleLogout} />
    // </div>

    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to the Dashboard</h1>
        <button className="logout-button" onClick={openModal}>Logout</button>
      </header>
      <main className="dashboard-main">
        {user ? (
          <div className="user-info">
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {/* Render other user details here */}
          </div>
        ) : (
          <div className="user-info loading">
            <p>Name: Loading user details...</p>
            <p>Email: Loading user details...</p>
          </div>
        )}
      </main>
      <Modal show={showModal} onClose={closeModal} onConfirm={handleLogout} />
    </div>
  );
};

export default Dashboard;
