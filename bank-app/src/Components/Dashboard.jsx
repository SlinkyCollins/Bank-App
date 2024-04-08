import axios  from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
    let navigate = useNavigate();
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
            }
        })
    }, [])
  return (
    <div>
        <h1>
            Welcome to the Dashboard
        </h1>
    </div>
  )
}

export default Dashboard