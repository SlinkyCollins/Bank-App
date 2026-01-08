import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminOverview = () => {
    const user = useSelector((state) => state.user?.userDetails);
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
                    <Typography variant="body1" sx={{ mb: 3 }}>Manage users and transactions from here.</Typography>
                </Box>
            </Box>
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