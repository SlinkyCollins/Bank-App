import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import "./Dashboard.css";
// import LogoutIcon from '@mui/icons-material/Logout';
// import { Container } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const drawWidth = 240;

function Dashboard() {
    const [mobileViewOpen, setMobileViewOpen] = React.useState(false);

    const handleToggle = () => {
        setMobileViewOpen(!mobileViewOpen);
    };

    const drawerContent = (
        <div style={{ backgroundColor: "#1A4631", height: "100%" }}>
            <Toolbar />
            <Divider />
            <Typography
                sx={{ textAlign: "center", pt: 4, color: "#FFD700", fontSize: 20 }}
            >
                NairaNest
            </Typography>
            <List>
                <ListItemButton sx={{ color: "white" }}>
                    <ListItemIcon sx={{ color: "white" }}>
                        <AccountBalanceIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                </ListItemButton>
                <ListItemButton sx={{ color: "white" }}>
                    <ListItemIcon sx={{ color: "white" }}>
                        <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Accounts"} />
                </ListItemButton>
                <ListItemButton sx={{ color: "white" }}>
                    <ListItemIcon sx={{ color: "white" }}>
                        <ReceiptIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Transactions"} />
                </ListItemButton>
                <ListItemButton sx={{ color: "white" }}>
                    <ListItemIcon sx={{ color: "white" }}>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Settings"} />
                </ListItemButton>
            </List>
        </div>
    );

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Balance',
                data: [1200, 1900, 3000, 5000, 2300, 4800],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };


    let navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // const classes = useStyles()

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("https://bank-app-6lyo.onrender.com/host/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });
                if (response.data.user) {
                    setUser(response.data.user);
                }
            } catch (error) {
                // Handle error: request failed
                console.error("Error fetching user details:", error);
                toast.dismiss();
                toast.error("Session Expired. Please log in again.");
                localStorage.removeItem("token");
                navigate("/login", { replace: true }); // Redirect to login page and replace history
            }
        };

        fetchUserDetails();
    }, [navigate]);


    const handleLogout = async () => {
        // Show loading toast
        const loadingToastId = toast.loading("Logging out...");

        try {
            // Remove user-related data from localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("sessionExpired");

            // Dismiss the loading toast
            setTimeout(() => {
                toast.dismiss(loadingToastId);
            }, 800)

            // Show success toast
            setTimeout(() => {
                toast.success("Logged out");
            }, 1000)

            // Clear console
            console.clear();

            // Navigate to the signin page
            navigate("/login", { replace: true });

        } catch (error) {
            // Dismiss the loading toast
            toast.dismiss(loadingToastId);

            // Show error toast
            toast.error("An error occurred while logging out. Please try again later.");

            // Log the error for debugging purposes
            console.error("Logout error:", error);
        }
    };

    const openModal = () => { 
        setShowModal(true);
        setAnchorEl(null);
    };
    const closeModal = () => setShowModal(false);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawWidth}px)` },
                        ml: { sm: `${drawWidth}px` },
                        backgroundColor: "#2DBE60",
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleToggle}
                            sx={{ mr: 2, display: { sm: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: "1" }}>
                            Dashboard
                        </Typography>

                        
                        {/* <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <Typography variant="h6">
                                {user ? (<span>{user.firstName}</span>) : (<p>User</p>)}
                            </Typography>
                            <Avatar />
                        </div> */}



                        <div style={{ marginLeft: 'auto' }}>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={openModal}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawWidth }, flexShrink: { sm: 0 } }}
                >
                    <Drawer
                        variant="temporary"
                        open={mobileViewOpen}
                        onClose={handleToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: "block", sm: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawWidth,
                            },
                        }}
                    >
                        {drawerContent}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: "none", sm: "block" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawWidth,
                            },
                        }}
                        open
                    >
                        {drawerContent}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawWidth}px)` },
                        backgroundColor: "#F5F5F5",
                    }}
                >
                    <Toolbar />
                    {/* <Typography variant="h4" gutterBottom>
                        Account Overview
                    </Typography>
                    <Typography paragraph>
                        Welcome to NairaNest. Here is your account overview.
                    </Typography> */}

                    <Typography variant="h4" gutterBottom>
                        Hi, {user ? (<span>{user.firstName}</span>) : (<p>User</p>)}
                    </Typography>
                    <Typography paragraph>
                        Welcome to NairaNest. Let&apos;s make payments.
                    </Typography>


                    {/* <Container fixed>
                        <button className="logout-button" onClick={openModal}>
                            <LogoutIcon
                                fontSize="medium"
                                color="default"
                            />
                            Logout
                        </button>
                    </Container> */}


                    <div>
                        <Line data={data} />
                    </div>


                    <Modal show={showModal} onClose={closeModal} onConfirm={handleLogout} />
                    {/* Add more content here like recent transactions, notifications, etc. */}
                </Box>
            </Box>
        </div>
    );
}

export default Dashboard;
