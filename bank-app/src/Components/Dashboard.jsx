import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  let navigate = useNavigate();

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
      }, 500)

      // Show success toast
      setTimeout(() => {
        toast.success("Logged out successfully");
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

  useEffect(() => {
    let URL = "http://localhost:5000/host/dashboard";
    let token = localStorage.getItem("token");
    axios
      .get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        if (res.data.status === true) {
          console.log("Success");
          // toast.success("User login successful");
        } else if (res.data.status !== true) {
          localStorage.removeItem("token");
          localStorage.setItem("sessionExpired", "true"); // Set session expired flag
          navigate("/signin");
          console.log(res.status);
          console.log("sessionExpired, please log in again");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.");
      });
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


  return (
    <div>
      <h1 className="text-underline">Welcome to the Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
