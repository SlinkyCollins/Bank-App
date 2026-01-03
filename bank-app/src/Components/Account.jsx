import React from 'react';
import { Box, Card, CardContent, Grid, TextField, Typography, Avatar, Button, Divider } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useSelector } from 'react-redux';

const Account = () => {
  const userInfo = useSelector((state) => state.user.userDetails);

  return (
    <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#34495e' }}>
        Profile Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Left Col: Avatar */}
        <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 4, textAlign: 'center', p: 3 }}>
                <Avatar 
                    src="https://picsum.photos/300/200" 
                    sx={{ width: 100, height: 100, margin: '0 auto 1rem' }} 
                />
                <Typography variant="h6">{userInfo?.firstName} {userInfo?.lastName}</Typography>
                <Typography variant="body2" color="textSecondary">Standard User</Typography>
            </Card>
        </Grid>

        {/* Right Col: Details */}
        <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 4 }}>
                <CardContent sx={{ p: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="First Name" defaultValue={userInfo?.firstName || "Ademola"} disabled variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Last Name" defaultValue={userInfo?.lastName || "Afolabi"} disabled variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Email" defaultValue={userInfo?.email || "user@example.com"} disabled variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Phone" defaultValue="09037613598" disabled variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Account Number" defaultValue="22554562939" disabled variant="outlined" />
                        </Grid>
                    </Grid>
                    
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" startIcon={<Edit />} sx={{ bgcolor: '#4a90e2', borderRadius: '20px' }}>
                            Edit Profile
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Account