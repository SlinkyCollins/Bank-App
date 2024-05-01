import axios from "axios";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  let navigate = useNavigate();

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
          toast.success("User login successful");
        } else {
          localStorage.removeItem("token");
          localStorage.setItem("sessionExpired", "true"); // Set session expired flag
        //   toast.error("Session expired, please login again");
          navigate("/signin");
          console.log(res.status);
          console.log("Error, please try again");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.");
      });
  }, [navigate]);

  return (
    <div>
      <Toaster />
      <h1 className="text-underline">Welcome to the Dashboard</h1>
      <button>Logout</button>
    </div>
  );
};

export default Dashboard;
