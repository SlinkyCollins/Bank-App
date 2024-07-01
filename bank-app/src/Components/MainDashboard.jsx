import { Box, Button, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material"
import ReceiptIcon from '@mui/icons-material/Receipt';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SettingsIcon from '@mui/icons-material/Settings';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MainDashboard = () => {

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

    const [user, setUser] = useState(null);
    let navigate = useNavigate();


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
                console.error("Error fetching user details:", error);
                toast.dismiss();
                toast.error("Session Expired. Please log in again.");
                localStorage.removeItem("token");
                navigate("/login", { replace: true });
            }
        };

        fetchUserDetails();
    }, [navigate]);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Hi, {user ? (<span>{user.firstName}</span>) : (<span>User</span>)}
            </Typography>
            <Typography paragraph>
                Welcome to NairaNest. Let&apos;s make payments.
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper>
                        <Box p={2}>
                            <Typography variant="h6">Account Balance</Typography>
                            <Typography variant="h4">$5,000.00</Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper>
                        <Box p={2}>
                            <Typography variant="h6">Recent Transactions</Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <ReceiptIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Transaction 1: -$100.00" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <ReceiptIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Transaction 2: +$500.00" />
                                </ListItem>
                                {/* Add more transactions here */}
                            </List>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>


            <Box mt={4}>
                <Button variant="contained" color="primary" startIcon={<TransferWithinAStationIcon />}>
                    Transfer Funds
                </Button>
                <Button variant="contained" color="secondary" startIcon={<ReceiptIcon />} style={{ marginLeft: 10 }}>
                    Pay Bills
                </Button>
            </Box>

            <Box mt={4}>
                <Typography variant="h6">Quick Links</Typography>
                <Divider />
                <List>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountBalanceIcon />
                        </ListItemIcon>
                        <ListItemText primary="View Accounts" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                </List>
            </Box>

            <div>
                <Line data={data} />
            </div>
        </div>
    )
}

export default MainDashboard
