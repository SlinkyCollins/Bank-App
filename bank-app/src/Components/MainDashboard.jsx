import React, { useState } from "react";
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  Typography, 
  IconButton, 
  Avatar, 
  List, 
  ListItem, 
  ListItemAvatar, 
  useTheme,
  useMediaQuery,
  Stack
} from "@mui/material";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

// Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentsIcon from '@mui/icons-material/Payments';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Import CSS
import "./MainDashboard.css";
import { useSelector } from "react-redux";

const MainDashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const theme = useTheme();
  // Target very small screens specifically
  const isSmallMobile = useMediaQuery('(max-width:375px)');
  
  const user = useSelector((state) => state.user?.userDetails);
  const balance = "345,000.00";

  const toggleBalance = () => setShowBalance(!showBalance);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [1200, 1900, 3000, 5000, 2300, 4800],
        tension: 0.4, 
        borderColor: '#4a90e2',
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        fill: true,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#4a90e2',
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10 } } },
      y: { grid: { color: '#f0f0f0' }, ticks: { display: false } }, 
    },
  };

  const actions = [
    { label: "Transfer", icon: <SendIcon />, color: "#4a90e2", bg: "#eef5fc" },
    { label: "To Bank", icon: <AccountBalanceIcon />, color: "#2dbe60", bg: "#eaf9f0" },
    { label: "Pay Bills", icon: <PaymentsIcon />, color: "#f39c12", bg: "#fef6e7" },
    { label: "Airtime", icon: <PhoneIphoneIcon />, color: "#9b59b6", bg: "#f5eafb" },
  ];

  const transactions = [
    { id: 1, title: "Netflix Subscription", date: "Today, 10:23 AM", amount: "-₦4,500", type: "debit" },
    { id: 2, title: "Femi Adebayo", date: "Yesterday, 4:00 PM", amount: "+₦50,000", type: "credit" },
    { id: 3, title: "MTN Airtime", date: "Oct 24, 2023", amount: "-₦1,000", type: "debit" },
    { id: 4, title: "Salary Deposit", date: "Oct 21, 2023", amount: "+₦250,000", type: "credit" },
  ];

  return (
    // MASTER WRAPPER
    <Box className="main-dashboard-container">
      
      {/* 1. Header Section */}
      <Box sx={{ mb: 3, px: 2, pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#34495e', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
            Hello, {user?.firstName || 'User'} 👋
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }}}>
            Here is your financial overview.
          </Typography>
        </Box>
        {!isSmallMobile && (
           <Button variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: '20px', backgroundColor: '#4a90e2', display: {xs: 'none', sm: 'flex'} }}>
             Add Money
           </Button>
        )}
      </Box>

      {/* Main Layout Grid - Zero Spacing to prevent overflow */}
      <Grid container spacing={0}>
        
        {/* LEFT COLUMN */}
        <Grid item xs={12} md={8}>
          
          {/* Wrapper: Adjusted padding to 1 (8px) for better fit on 320px screens */}
          <Box sx={{ p: { xs: 1, md: 3 }, pt: 0 }}> 
            
            {/* 2. Balance Card */}
            <Card className="balance-card glass-effect" sx={{ borderRadius: 4, mb: 3, position: 'relative', overflow: 'hidden' }}>
              <Box className="card-decoration-circle" />
              {/* Reduced padding inside card for small screens */}
              <CardContent sx={{ position: 'relative', zIndex: 2, color: 'white', p: { xs: 1.5, sm: 4 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Balance</Typography>
                  <IconButton onClick={toggleBalance} size="small" sx={{ color: 'white' }}>
                    {showBalance ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                  </IconButton>
                </Box>
                
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, fontSize: 'clamp(1.8rem, 8vw, 3rem)' }}>
                  {showBalance ? `₦${balance}` : "********"}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="contained" startIcon={<ArrowUpwardIcon />} className="action-btn-primary" sx={{ bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', flex: 1 }}>
                    Send
                  </Button>
                  <Button variant="contained" startIcon={<ArrowDownwardIcon />} className="action-btn-primary" sx={{ bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', flex: 1 }}>
                    Receive
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* 3. Quick Actions */}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#34495e' }}>Quick Actions</Typography>
            
            {/* FIX: Reduced spacing to 1 (8px) on mobile to prevent negative margin overflow */}
            <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ mb: 3 }}>
              {actions.map((action, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Card className="action-card" sx={{ borderRadius: 3, textAlign: 'center', cursor: 'pointer', boxShadow: 'none', bgcolor: 'white', border: '1px solid #f0f2f5', height: '100%', '&:hover': { transform: 'translateY(-3px)' } }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box sx={{ width: 45, height: 45, borderRadius: '50%', bgcolor: action.bg, color: action.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                        {React.cloneElement(action.icon, { fontSize: "medium" })}
                      </Box>
                      <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>{action.label}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* 4. Statistics Chart */}
            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>Analytics</Typography>
                  <Button size="small" endIcon={<TrendingUpIcon />} sx={{ color: '#2dbe60' }}>+12.5%</Button>
                </Box>
                <Box sx={{ height: 250, position: 'relative', width: '100%', overflow: 'hidden' }}>
                  <Line data={chartData} options={chartOptions} />
                </Box>
              </CardContent>
            </Card>

          </Box>
        </Grid>

        {/* RIGHT COLUMN */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: { xs: 1, md: 3 }, pt: 0, pl: { md: 0 } }}>
            {/* 5. Transactions */}
            <Card sx={{ borderRadius: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>Transactions</Typography>
                  <Button size="small">See All</Button>
                </Box>
                
                <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
                  {transactions.map((t) => (
                    <React.Fragment key={t.id}>
                      <ListItem disableGutters sx={{ py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
                        <ListItemAvatar sx={{ minWidth: 50 }}>
                          <Avatar sx={{ bgcolor: t.type === 'credit' ? '#eaf9f0' : '#fdeded', color: t.type === 'credit' ? '#2dbe60' : '#e74c3c', width: 35, height: 35 }}>
                            {t.title.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%', minWidth: 0 }}>
                          <Box sx={{ overflow: 'hidden', mr: 1, minWidth: 0 }}>
                              <Typography variant="subtitle2" fontWeight={600} noWrap>
                                  {t.title}
                              </Typography>
                              <Typography variant="caption" color="textSecondary" noWrap>
                                  {t.date}
                              </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: t.type === 'credit' ? '#2dbe60' : '#e74c3c', whiteSpace: 'nowrap' }}>
                            {t.amount}
                          </Typography>
                        </Stack>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
};

export default MainDashboard;