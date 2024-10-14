import { Box, Button, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material"
import ReceiptIcon from '@mui/icons-material/Receipt';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SettingsIcon from '@mui/icons-material/Settings';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LaunchIcon from '@mui/icons-material/Launch';
// import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBalanceSharpIcon from '@mui/icons-material/AccountBalanceSharp';
// import PhoneIphoneSharpIcon from '@mui/icons-material/PhoneIphoneSharp';
// import MobiledataOffIcon from '@mui/icons-material/MobiledataOff';
// import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
// import LiveTvIcon from '@mui/icons-material/LiveTv';
// import SavingsIcon from '@mui/icons-material/Savings';
// import CreditScoreIcon from '@mui/icons-material/CreditScore';
// import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
// import ReadMoreIcon from '@mui/icons-material/ReadMore';  


const MainDashboard = () => {

  const [showBalance, setShowBalance] = useState(true);

  const balance = "3000.00";

  const handleClickShowBalance = () => setShowBalance((show) => !show);

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

  return (
    <div style={{ margin: "4rem 0 0" }}>
      <Typography variant="h4" gutterBottom>
        {/* Hi, {user ? (<span>{user.firstName}</span>) : (<span>User</span>)} */}
      </Typography>
      <Typography paragraph>
        Welcome to NairaNest. Let&apos;s make payments.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ backgroundColor: "#2dbe60", borderRadius: "10px", color: "#fff" }}>
            <Box sx={{ padding: ".5rem 1rem 1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", margin: "0 0 .5rem" }}>
                <Typography sx={{ fontSize: "12px" }}>
                  Available Balance
                  <IconButton
                    onClick={handleClickShowBalance}
                  >
                    {showBalance ? <VisibilityIcon sx={{ fontSize: "15px", cursor: "pointer", margin: "0 0 2px 0", color: "#fff" }} /> : <VisibilityOffIcon sx={{ fontSize: "15px", cursor: "pointer", margin: "0 0 2px 0", color: "#fff" }} />}
                  </IconButton>
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>
                    Transaction History
                  </Typography>
                  <KeyboardArrowRightIcon sx={{ fontSize: "18px", cursor: "pointer" }} />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="h5"
                >{showBalance ? `₦${balance}` : "****"}
                </Typography>
                <Button variant="filled" startIcon={<AddIcon sx={{ fontSize: ".8rem", cursor: "pointer" }} />} sx={{ backgroundColor: "#fff", color: "#2DBE60", borderRadius: "20px", textTransform: "capitalize", fontSize: ".8rem" }}>
                  Add Money
                </Button>
              </div>
            </Box>
          </Paper>
        </Grid>


        <Grid item xs={12} md={7}>
          <Paper sx={{ backgroundColor: "#fff", borderRadius: "10px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", padding: "1rem 1.5rem 1rem 1rem" }}>
         
                <IconButton style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".8rem", cursor: "pointer" }}>
                  <AccountBoxIcon style={{ color: "#2dbe60", backgroundColor: "#f1f5f6", padding: "10px", fontSize: "3.2rem", borderRadius: "20px" }} />
                  <Typography sx={{fontSize: ".8rem", color: "#3C3D37"}}>To NairaNest</Typography>
                </IconButton>
             
              <IconButton style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".8rem" }}>
                <AccountBalanceSharpIcon style={{ color: "#2dbe60", backgroundColor: "#f1f5f6", padding: "10px", fontSize: "3.2rem", borderRadius: "20px" }} />
                <Typography sx={{fontSize: ".8rem", color: "#3C3D37"}}>To Bank</Typography>
              </IconButton>
              <IconButton style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".8rem" }}>
                <LaunchIcon style={{ color: "#2dbe60", backgroundColor: "#f1f5f6", padding: "10px", fontSize: "3.2rem", borderRadius: "20px" }} />
                <Typography sx={{fontSize: ".8rem", color: "#3C3D37"}}>Withdraw</Typography>
              </IconButton>
            </Box>
          </Paper>
        </Grid>


        <Grid item xs={12} md={12}>
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

{/* 
      <Grid container spacing={3}>
      <Grid item xs={8} md={12}>
          <Paper sx={{ backgroundColor: "#fff", borderRadius: "10px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", padding: "1rem 1.5rem 1rem 1rem" }}>
         
                <IconButton style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".8rem", cursor: "pointer" }}>
                  <PhoneIphoneSharpIcon style={{ color: "#2dbe60", backgroundColor: "#f1f5f6", padding: "10px", fontSize: "3.2rem", borderRadius: "20px" }} />
                  <Typography sx={{fontSize: ".8rem", color: "#3C3D37"}}>Airtime</Typography>
                </IconButton>
             
              <IconButton style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".8rem" }}>
                <MobiledataOffIcon style={{ color: "#2dbe60", backgroundColor: "#f1f5f6", padding: "10px", fontSize: "3.2rem", borderRadius: "20px" }} />
                <Typography sx={{fontSize: ".8rem", color: "#3C3D37"}}>Data</Typography>
              </IconButton>
              <IconButton style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".8rem" }}>
                <SportsSoccerIcon style={{ color: "#2dbe60", backgroundColor: "#f1f5f6", padding: "10px", fontSize: "3.2rem", borderRadius: "20px" }} />
                <Typography sx={{fontSize: ".8rem", color: "#3C3D37"}}>Betting</Typography>
              </IconButton>

              <IconButton style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".8rem", cursor: "pointer" }}>
                  <LiveTvIcon style={{ color: "#2dbe60", backgroundColor: "#f1f5f6", padding: "10px", fontSize: "3.2rem", borderRadius: "20px" }} />
                  <Typography sx={{fontSize: ".8rem", color: "#3C3D37"}}>TV</Typography>
                </IconButton>
             
              <IconButton style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".8rem" }}>
                <SavingsIcon style={{ color: "#2dbe60", backgroundColor: "#f1f5f6", padding: "10px", fontSize: "3.2rem", borderRadius: "20px" }} />
                <Typography sx={{fontSize: ".8rem", color: "#3C3D37"}}>Savings</Typography>
              </IconButton>
              <IconButton style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".8rem" }}>
                <CreditScoreIcon style={{ color: "#2dbe60", backgroundColor: "#f1f5f6", padding: "10px", fontSize: "3.2rem", borderRadius: "20px" }} />
                <Typography sx={{fontSize: ".8rem", color: "#3C3D37"}}>Loan</Typography>
              </IconButton>
            </Box>
          </Paper>
        </Grid>

        </Grid> */}



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




// MainDashboard.jsx

// import { useSelector } from 'react-redux';

// const MainDashboard = () => {
//   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
//   const userInfo = useSelector((state) => state.user.userDetails);

//   // console.log("User is authenticated:", isAuthenticated);
//   // console.log("User info:", userInfo);

//   return (
//     <div style={{margin: "5rem 0 0"}}>
//       {isAuthenticated ? (
//         <p>Welcome, {userInfo?.firstName}</p>
//       ) : (
//         <p>Please log in to access the dashboard.</p>
//       )}
//     </div>
//   );
// };

// export default MainDashboard;



















