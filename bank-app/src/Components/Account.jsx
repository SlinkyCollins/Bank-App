import axios from 'axios';
import toast from "react-hot-toast";
import { Box, Card, CardContent, Grid, TextField, Typography, Avatar, Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { setUser } from '../Redux/userSlice';

const Account = () => {
    const userInfo = useSelector((state) => state.user.userDetails);
    const [errors, setErrors] = useState({ firstName: '', lastName: '' });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: userInfo?.firstName || '',
        lastName: userInfo?.lastName || '',
        phone: ''
    });
    const dispatch = useDispatch(); // Redux dispatch

    // Handle edit
    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => {
        setProfileData({
            firstName: userInfo?.firstName || '',
            lastName: userInfo?.lastName || '',
            phone: userInfo?.phone || ''
        });
        setIsEditing(false);
    };
    const handleSave = async () => {
        const newErrors = { firstName: '', lastName: '' };
        if (!profileData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!profileData.lastName.trim()) newErrors.lastName = 'Last name is required';
        setErrors(newErrors);
        if (newErrors.firstName || newErrors.lastName) return;

        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/auth/update-profile`, profileData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            dispatch(setUser(response.data.user));
            toast.success('Profile updated!');
            setIsEditing(false);
            setErrors({ firstName: '', lastName: '' });
        } catch (error) {
            console.log(error);
            toast.error('Update failed.');
        }
    };
    // Fetch user info on mount
    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!userInfo?.firstName) {
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/get-profile`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    dispatch(setUser(response.data.profile));
                } catch (error) {
                    console.error("Failed to fetch user info:", error);
                }
            }
            setLoading(false);
        };
        fetchUserInfo();
    }, [userInfo?.firstName]);

    useEffect(() => {
        if (userInfo) {
            setProfileData({
                firstName: userInfo.firstName || '',
                lastName: userInfo.lastName || '',
                phone: userInfo.phone || ''
            });
        }
    }, [userInfo]);

    // In return, add loading check
    if (loading) return <Typography>Loading...</Typography>;

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
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        value={profileData.firstName}
                                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                        disabled={!isEditing}
                                        variant="outlined"
                                        error={!!errors.firstName}
                                        helperText={errors.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        value={profileData.lastName}
                                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                        disabled={!isEditing}
                                        variant="outlined"
                                        error={!!errors.lastName}
                                        helperText={errors.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        defaultValue={userInfo?.email || "user@example.com"}
                                        disabled
                                        variant="outlined"
                                        helperText="To change email address, please contact support."
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Phone"
                                        value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                        disabled={!isEditing}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Account Number"
                                        defaultValue={userInfo?.accountNumber || ""}
                                        disabled
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" startIcon={<Edit />} onClick={isEditing ? handleSave : handleEdit} sx={{ bgcolor: '#4a90e2', borderRadius: '20px' }}>
                                    {isEditing ? 'Save' : 'Edit Profile'}
                                </Button>
                                {isEditing && <Button onClick={handleCancel} sx={{ ml: 1 }}>Cancel</Button>}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Account