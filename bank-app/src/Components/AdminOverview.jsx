import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';

const AdminOverview = () => {
    const user = useSelector((state) => state.user?.userDetails);
    const [userCount, setUserCount] = useState(0);
    const [transactionCount, setTransactionCount] = useState(0);

    useEffect(() => {
        if (user?.role === 'admin') {
            const fetchCounts = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const [usersRes, transRes] = await Promise.all([
                        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
                        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/transactions`, { headers: { Authorization: `Bearer ${token}` } })
                    ]);
                    setUserCount(usersRes.data.userCount);
                    setTransactionCount(transRes.data.transactionCount);
                } catch (error) {
                    console.error("Failed to fetch counts:", error);
                }
            };
            fetchCounts();
        }
    }, [user]);

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 3, px: 2, pt: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#34495e', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                        Hello, {user?.firstName || 'Admin'} 👋
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                        Here is your Admin Dashboard Overview.
                    </Typography>
                </Box>
            </Box>

            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <PeopleIcon sx={{ fontSize: 40, color: '#4a90e2', mb: 1 }} />
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>{userCount}</Typography>
                            <Typography variant="body2" color="textSecondary">Total Users</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <ReceiptIcon sx={{ fontSize: 40, color: '#2dbe60', mb: 1 }} />
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>{transactionCount}</Typography>
                            <Typography variant="body2" color="textSecondary">Total Transactions</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item>
                    <Button variant="contained" component={Link} to="/dashboard/admin/users">View All Users</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" component={Link} to="/dashboard/admin/transactions">View All Transactions</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminOverview;