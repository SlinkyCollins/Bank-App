import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
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
import Modal from "./Modal"; // Ensure this path is correct
import "./Dashboard.css";
import { AccountCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUser } from '../Redux/userSlice'; // Ensure this path is correct
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logo from "/src/assets/logo.png";

const drawWidth = 260;

// THEME COLORS
const PRIMARY_BLUE = "#4a90e2";
const SIDEBAR_BG = "#1e272e"; // Darker professional sidebar
const ACCENT_GOLD = "#FFD700";

function Dashboard() {
    const [mobileViewOpen, setMobileViewOpen] = React.useState(false);
    const user = useSelector((state) => state.user.userDetails);

    const handleToggle = () => {
        setMobileViewOpen(!mobileViewOpen);
    };

    const menuItems = [
        { text: 'Dashboard', icon: <HomeIcon />, path: '/dashboard/user' },
        { text: 'Profile', icon: <AccountBoxIcon />, path: '/dashboard/user/account' },
        { text: 'Transactions', icon: <ReceiptIcon />, path: '/dashboard/user/transactions' },
        { text: 'Settings', icon: <SettingsIcon />, path: '/dashboard/user/settings' },
    ];

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/dashboard`, {
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
            setTimeout(() => { toast.dismiss(loadingToastId); }, 400);
            setTimeout(() => { toast.success("Logged out"); }, 400);
            dispatch(logout());
            navigate("/login", { replace: true });
        } catch (error) {
            toast.dismiss(loadingToastId);
            toast.error("Logout failed.");
        }
    };

    const openModal = () => { setShowModal(true); setAnchorEl(null); };
    const closeModal = () => setShowModal(false);
    const handleMenu = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };

    // Sidebar Content Component to avoid duplication
    const drawerContent = (
        <div style={{ backgroundColor: SIDEBAR_BG, height: "100%", color: "#fff" }}>
            <Link to="/">
                <img src={Logo} style={{ width: "100%", height: "6rem", objectFit: "contain", margin: "1rem auto 0", cursor: "pointer" }} alt="NairaNest Logo" />
            </Link>
            <List sx={{ paddingX: "1rem" }}>
                {menuItems.map(item => (
                    <NavLink
                        to={item.path}
                        key={item.text}
                        end={true}  // Add this: Forces exact matching (only active if path matches exactly)
                        style={({ isActive }) => ({
                            textDecoration: "none",
                            color: isActive ? PRIMARY_BLUE : "#b2bec3", // Highlight active link
                            display: 'block',
                            marginBottom: '8px'
                        })}
                        onClick={() => setMobileViewOpen(false)}
                    >
                        {({ isActive }) => (
                            <ListItemButton
                                sx={{
                                    borderRadius: '8px',
                                    backgroundColor: isActive ? 'rgba(74, 144, 226, 0.1)' : 'transparent',
                                }}
                            >
                                <ListItemIcon sx={{ color: isActive ? PRIMARY_BLUE : "#b2bec3", minWidth: '40px' }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: isActive ? 600 : 400 }} />
                            </ListItemButton>
                        )}
                    </NavLink>
                ))}

                <Box sx={{ mt: 5 }}>
                    <ListItemButton onClick={openModal} sx={{ color: "#e74c3c", borderRadius: '8px' }}>
                        <ListItemIcon sx={{ color: "#e74c3c", minWidth: '40px' }}><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </Box>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: "flex", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
            <CssBaseline />

            {/* Header / App Bar */}
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    width: { sm: `calc(100% - ${drawWidth}px)` },
                    ml: { sm: `${drawWidth}px` },
                    backgroundColor: "#fff", // White header for modern look
                    color: "#333",
                    borderBottom: "1px solid #eaeff1"
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
                    <Box sx={{ flexGrow: 1 }} /> {/* Spacer to push items right */}

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {user ? (
                            <Avatar alt={user?.firstName} src="https://picsum.photos/300/200" sx={{ width: 35, height: 35 }} />
                        ) : (
                            <AccountCircle color="action" />
                        )}
                        <IconButton onClick={handleMenu} color="inherit" size="small">
                            <Typography variant="body2" sx={{ fontWeight: 600, mr: 0.5 }}>{user?.firstName || 'User'}</Typography>
                            <KeyboardArrowDownIcon fontSize="small" />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: { overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))', mt: 1.5 }
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleClose}><Link to="/dashboard/account" style={{ textDecoration: "none", color: "inherit" }}>Profile</Link></MenuItem>
                            <MenuItem onClick={openModal}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Sidebar Logic */}
            <Box component="nav" sx={{ width: { sm: drawWidth }, flexShrink: { sm: 0 } }}>
                {/* Mobile Drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileViewOpen}
                    onClose={handleToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawWidth },
                    }}
                >
                    {drawerContent}
                </Drawer>
                {/* Desktop Drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawWidth, borderRight: 'none' },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>

            {/* Main Content Area */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawWidth}px)` }, mt: 6 }}>
                <Outlet />
                <Modal show={showModal} onClose={closeModal} onConfirm={handleLogout} />
            </Box>
        </Box>
    );
}

export default Dashboard;