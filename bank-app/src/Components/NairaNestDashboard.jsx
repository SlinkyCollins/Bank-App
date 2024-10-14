import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, ListItemButton, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, NavLink, Outlet, Link } from "react-router-dom";
import Modal from "./Modal";
import "./Dashboard.css";
import { AccountCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUser } from '../Redux/userSlice';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import { useLocation } from "react-router-dom";
import { green } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const drawWidth = 260;

function Dashboard() {
    // const location = useLocation();

    const [mobileViewOpen, setMobileViewOpen] = React.useState(false);
    const user = useSelector((state) => state.user.userDetails);
    // console.log('dashboard user', user);

    const handleToggle = () => {
        setMobileViewOpen(!mobileViewOpen);
    };

    const menuItems = [
        { text: 'Dashboard', icon: <HomeIcon />, path: '' },
        // { text: 'Wallet', icon: <AccountBalanceWalletIcon />, path: 'wallet' },
        { text: 'Profile', icon: <AccountBoxIcon />, path: 'account' },
        { text: 'Transactions', icon: <ReceiptIcon />, path: 'transactions' },
        { text: 'Settings', icon: <SettingsIcon />, path: 'settings' },
    ];

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

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
                    dispatch(setUser(response.data.user));
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
                toast.dismiss();
                toast.error("Session Expired. Please log in again.");
                localStorage.removeItem("token");
                navigate("/login", { replace: true });
            }
        };

        fetchUserDetails();
    }, [dispatch, navigate]);

    const handleLogout = async () => {
        const loadingToastId = toast.loading("Logging out...");


        try {
            localStorage.removeItem("token");

            setTimeout(() => {
                toast.dismiss(loadingToastId);
            }, 800);

            setTimeout(() => {
                toast.success("Logged out");
            }, 1000);

            dispatch(logout());


            console.clear();
            // Redirect to login
            navigate("/login", { replace: true });


        } catch (error) {
            toast.dismiss(loadingToastId);
            toast.error("An error occurred while logging out. Please try again later.");
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
                        padding: "5px"
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
                            {/* Hi, {user ? user?.firstName : 'User'} */}
                        </Typography>
                        {/* <NotificationsIcon
                            style={{fontSize: "20px", cursor: "pointer"}}
                        /> */}
                        <div style={{display: "flex"}}>
                            <div>
                            {user ? (
                                    <Avatar
                                        alt={user?.firstName}
                                        src="https://picsum.photos/300/200"
                                        sx={{ width: 30, height: 30, bgcolor: green[400], margin: "3px 5px 0 0", cursor: "pointer" }}
                                        />
                                ) : (
                                    <AccountCircle />
                                )}
                            </div>
                            <div>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Typography>{user?.firstName}</Typography>
                                <KeyboardArrowDownIcon style={{fontSize: "20px"}}/>
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
                                <MenuItem onClick={handleClose} disableRipple><Link to="/dashboard/account" style={{textDecoration: "none", color: "inherit"}}>Profile</Link></MenuItem>
                                <MenuItem onClick={openModal}>Logout</MenuItem>
                            </Menu>
                            </div>
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
                        <div style={{ backgroundColor: "#1A4631", height: "100%" }}>
                            {/* <Toolbar /> */}
                            {/* <Divider /> */}
                            <Typography
                                sx={{ textAlign: "left", pt: 5, pl: 4.5, pb: 3, color: "#FFD700", fontSize: 25 }}
                            >
                                NairaNest
                            </Typography>
                            <List
                                sx={{paddingX: "1rem"}}
                            >
                                {menuItems.map(item => (
                                    <NavLink
                                        to={item.path}
                                        key={item.text}
                                        style={({ isActive }) => ({
                                            textDecoration: "none",
                                            color: isActive ? "#FFD700" : "white",
                                        })}
                                        onClick={() => setMobileViewOpen(false)} // Close drawer on click
                                    >
                                        <ListItemButton sx={{ color: "inherit" }}>
                                            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
                                            <ListItemText primary={item.text} />
                                        </ListItemButton>
                                    </NavLink>
                                ))}
                            </List>
                        </div>
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
                        <div style={{ backgroundColor: "#1A4631", height: "100%" }}>
                            {/* <Toolbar /> */}
                            {/* <Divider /> */}
                            <Typography
                                sx={{ textAlign: "left", pt: 4, pl: 4.5, pb: 4, color: "#FFD700", fontSize: 20 }}
                            >
                                NairaNest
                            </Typography>
                            <List 
                                sx={{paddingX: "1rem"}}
                            >
                                {menuItems.map(item => (
                                    <NavLink
                                        to={item.path}
                                        key={item.text}
                                        style={({ isActive }) => ({
                                            textDecoration: "none",
                                            color: isActive ? "#FFD700" : "white",
                                        })}
                                        onClick={() => setMobileViewOpen(false)} // Close drawer on click
                                    >
                                        <ListItemButton sx={{ color: "inherit" }}>
                                            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
                                            <ListItemText primary={item.text} />
                                        </ListItemButton>
                                    </NavLink>
                                ))}
                            </List>
                        </div>
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawWidth}px)` },
                        backgroundColor: "#EBF3F9",
                    }}
                >
                    {/* <Toolbar /> */}
                    <Outlet />
                    <Modal show={showModal} onClose={closeModal} onConfirm={handleLogout} />
                </Box>
            </Box>
        </div>
    );
}

export default Dashboard;