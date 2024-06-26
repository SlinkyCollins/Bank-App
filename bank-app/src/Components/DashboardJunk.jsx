// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import Modal from "./Modal";
// import "./Dashboard.css";
// import Typography from "@mui/material/Typography";
// import Button from '@mui/material/Button';
// import { ButtonGroup, Container } from "@mui/material";
// import AcUnitIcon from '@mui/icons-material/AcUnit';
// import LogoutIcon from '@mui/icons-material/Logout';
// // import { makeStyles } from '@mui/material/styles';

// // const useStyles = makeStyles({
// //   btn: {
// //     fontSize: 52,
// //     backgroundColor: 'red'
// //   }
// // })

// const Dashboard = () => {
//   let navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   // const classes = useStyles()

//   useEffect(() => {
//     // let URL = "http://localhost:5000/host/dashboard";
//     // let token = localStorage.getItem("token");
//     // axios
//     //   .get(URL, {
//     //     headers: {
//     //       Authorization: `Bearer ${token}`,
//     //       "Content-Type": "application/json",
//     //       Accept: "application/json",
//     //     },
//     //   })
//     //   .then((res) => {
//     //     if (res.data.status === true) {
//     //       console.log("Success");
//     //       console.log(res);
//     //       document.getElementById("inner").innerText = res.data.user;
//     //       // toast.success("User login successful");
//     //     } else if (res.data.status !== true) {
//     //       localStorage.removeItem("token");
//     //       localStorage.setItem("sessionExpired", "true"); // Set session expired flag
//     //       navigate("/signin");
//     //       console.log(res.status);
//     //       console.log("sessionExpired, please log in again");
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     console.error("Error:", error);
//     //     toast.error("An error occurred. Please try again later.");
//     //   });

//     const fetchUserDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("https://bank-app-6lyo.onrender.com/host/dashboard", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         });
//         if (response.data.user) {
//           setUser(response.data.user);
//         }
//       } catch (error) {
//         // Handle error: request failed
//         console.error("Error fetching user details:", error);
//         toast.dismiss(); 
//         toast.error("Session Expired. Please log in again.");
//         localStorage.removeItem("token");
//         // navigate("/login", { replace: true }); // Redirect to login page and replace history
//       }
//     };

//     fetchUserDetails();
//   }, [navigate]);


//   const handleLogout = async () => {
//     // Show loading toast
//     const loadingToastId = toast.loading("Logging out...");

//     try {
//       // Remove user-related data from localStorage
//       localStorage.removeItem("token");
//       localStorage.removeItem("sessionExpired");

//       // Dismiss the loading toast
//       setTimeout(() => {
//         toast.dismiss(loadingToastId);
//       }, 800)

//       // Show success toast
//       setTimeout(() => {
//         toast.success("Logged out");
//       }, 1000)

//       // Clear console
//       console.clear();

//       // Navigate to the signin page
//       // navigate("/login", { replace: true });
      
//     } catch (error) {
//       // Dismiss the loading toast
//       toast.dismiss(loadingToastId);

//       // Show error toast
//       toast.error("An error occurred while logging out. Please try again later.");

//       // Log the error for debugging purposes
//       console.error("Logout error:", error);
//     }
//   };

//   const openModal = () => setShowModal(true);
//   const closeModal = () => setShowModal(false);

//   return (
    
//     // <div>
//     //   <h1 className="text-underline">Welcome to the Dashboard</h1>
//     //   {user ? (
//     //     <div>
//     //       <p>Name: {user.firstName} {user.lastName}</p>
//     //       <p>Email: {user.email}</p>
//     //       {/* Render other user details here */}
//     //     </div>
//     //   ) : (
//     //     <div>
//     //       <p>Name: Loading user details...</p>
//     //       <p>Email: Loading user details...</p>
//     //     </div>
//     //   )}
//     //   <button onClick={openModal}>Logout</button>
//     //   <Modal show={showModal} onClose={closeModal} onConfirm={handleLogout} />
//     // </div>

//     <Container fixed className="dashboard-container">
//       <header className="dashboard-header">
//         <h1>Welcome</h1>
//         <button className="logout-button" onClick={openModal}>Logout</button>
//       </header>
//       <Typography
//         noWrap
//         gutterBottom
//         variant="h6"
//         component="h2"
//         color="textSecondary"
//       >
//         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed in repudiandae, qui reiciendis possimus dolorem? Modi tempora magni delectus magnam sunt nemo odio at ipsa atque, fuga reprehenderit voluptatum quaerat. Expedita ullam esse corporis vero aliquid officiis dicta quidem cupiditate sed, explicabo corrupti soluta impedit voluptatum, voluptates iure animi cum. Qui esse, dignissimos quam dolore cumque consectetur nemo aliquam minima accusantium ullam velit eos voluptate fugit error, omnis asperiores iusto nam optio culpa sapiente sequi! Molestias obcaecati, nihil cupiditate porro officia pariatur vero, corrupti nam quaerat doloremque provident reiciendis nulla natus qui tempora minus ipsa quis? Sequi amet, dolorum rerum dignissimos est, corporis nostrum neque fugiat vero consequatur sunt possimus aspernatur ab. Dolor esse omnis quidem animi veniam, possimus expedita!
//       </Typography>
//       <Button 
//         // className={classes.btn}
//         variant="contained" 
//         type="submit" 
//         onClick={()=> console.log("You clicked me")} 
//       >
//         <LogoutIcon 
//           fontSize="medium"
//           color="default"
//         />
//         Submit</Button>
//       <ButtonGroup color="primary" variant="outlined">
//         <Button>One</Button>
//         <Button>Two</Button>
//         <Button>Three</Button>
//         <Button>Four</Button>
//         <Button>Five</Button>
//       </ButtonGroup>
//       <br />
//       <AcUnitIcon color="secondary" />


//       <main className="dashboard-main">
//         {user ? (
//           <div className="user-info">
//             <p><span>Name:</span> {user.firstName} {user.lastName}</p>
//             <p><span>Email:</span> {user.email}</p>
//             {/* Render other user details here */}
//           </div>
//         ) : (
//           <div className="user-info loading">
//             <p>Name: Loading user details...</p>
//             <p>Email: Loading user details...</p>
//           </div>
//         )}
//       </main>
//       <Modal show={showModal} onClose={closeModal} onConfirm={handleLogout} />
//     </Container>
//   );
// };

// export default Dashboard;

// // Dashboard.js
// // import React from 'react';
// // import { Container, Grid, Paper, Typography, Box, Button } from '@mui/material';

// // const Dashboard = () => {
// //   return (
// //     <Container>
// //       <Typography variant="h4" gutterBottom>
// //         Dashboard
// //       </Typography>
// //       <Grid container spacing={3}>
// //         <Grid item xs={12} md={4}>
// //           <Paper>
// //             <Box p={2}>
// //               <Typography variant="h6">Account Balance</Typography>
// //               <Typography variant="h4">$5,000.00</Typography>
// //             </Box>
// //           </Paper>
// //         </Grid>
// //         <Grid item xs={12} md={8}>
// //           <Paper>
// //             <Box p={2}>
// //               <Typography variant="h6">Recent Transactions</Typography>
// //               <ul>
// //                 <li>Transaction 1: -$100.00</li>
// //                 <li>Transaction 2: +$500.00</li>
// //               </ul>
// //             </Box>
// //           </Paper>
// //         </Grid>
// //       </Grid>
// //       <Box mt={4}>
// //         <Button variant="contained" color="primary">Transfer Funds</Button>
// //         <Button variant="contained" color="secondary" style={{ marginLeft: 10 }}>Pay Bills</Button>
// //       </Box>
// //     </Container>
// //   );
// // }

// // export default Dashboard;




// // Dashboard.js
// // import React from 'react';
// // import { Container, Typography, Paper, Box, Grid, Button } from '@mui/material';

// // const Dashboard = () => {
// //   return (
// //     <Container>
// //       <Typography variant="h4" gutterBottom>
// //         Dashboard
// //       </Typography>
// //       <Grid container spacing={3}>
// //         <Grid item xs={12} md={4}>
// //           <Paper>
// //             <Box p={2}>
// //               <Typography variant="h6">Account Balance</Typography>
// //               <Typography variant="h4">$5,000.00</Typography>
// //             </Box>
// //           </Paper>
// //         </Grid>
// //         <Grid item xs={12} md={8}>
// //           <Paper>
// //             <Box p={2}>
// //               <Typography variant="h6">Recent Transactions</Typography>
// //               <ul>
// //                 <li>Transaction 1: -$100.00</li>
// //                 <li>Transaction 2: +$500.00</li>
// //               </ul>
// //             </Box>
// //           </Paper>
// //         </Grid>
// //       </Grid>
// //       <Box mt={4}>
// //         <Button variant="contained" color="primary">Transfer Funds</Button>
// //         <Button variant="contained" color="secondary" style={{ marginLeft: 10 }}>Pay Bills</Button>
// //       </Box>
// //     </Container>
// //   );
// // }

// // export default Dashboard;


// {/* <Grid container>
// <Grid item xs={12} sm={6} md={3}>
//   <Paper>1</Paper>
// </Grid>
// <Grid item xs={12} sm={6} md={3}>
//   <Paper>2</Paper>
// </Grid>
// <Grid item xs={12} sm={6} md={3}>
//   <Paper>3</Paper>
// </Grid>
// <Grid item xs={12} sm={6} md={3}>
//   <Paper>4</Paper>
// </Grid>
// </Grid>
// </Container> */}







// Letter avatars


// <Avatar {...stringAvatar('Afolabi Ademola')} />

// function stringToColor(string) {
//     let hash = 0;
//     let i;
  
//     /* eslint-disable no-bitwise */
//     for (i = 0; i < string.length; i += 1) {
//       hash = string.charCodeAt(i) + ((hash << 5) - hash);
//     }
  
//     let color = '#';
  
//     for (i = 0; i < 3; i += 1) {
//       const value = (hash >> (i * 8)) & 0xff;
//       color += `00${value.toString(16)}`.slice(-2);
//     }
//     /* eslint-enable no-bitwise */
  
//     return color;
//   }

// function stringAvatar(name) {
//     return {
//       sx: {
//         bgcolor: stringToColor(name),
//       },
//       children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//     };
//   }





/// Dashboard ui 


// Dashboard.js
// import React from 'react';
// import { Container, Typography, Paper, Box, Grid, Button, AppBar, Toolbar, IconButton, Menu, MenuItem, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import SettingsIcon from '@mui/icons-material/Settings';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const navigate = useNavigate();

//     const handleMenu = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/login");
//     };

//     return (
//         <Container>
//             <AppBar position="static">
//                 <Toolbar>
//                     <Typography variant="h6" sx={{ flexGrow: 1 }}>
//                         NairaNest Bank
//                     </Typography>
//                     <div>
//                         <IconButton
//                             edge="end"
//                             aria-label="account of current user"
//                             aria-controls="menu-appbar"
//                             aria-haspopup="true"
//                             onClick={handleMenu}
//                             color="inherit"
//                         >
//                             <AccountCircle />
//                         </IconButton>
//                         <Menu
//                             id="menu-appbar"
//                             anchorEl={anchorEl}
//                             anchorOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'right',
//                             }}
//                             keepMounted
//                             transformOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'right',
//                             }}
//                             open={Boolean(anchorEl)}
//                             onClose={handleClose}
//                         >
//                             <MenuItem onClick={handleClose}>Profile</MenuItem>
//                             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//                         </Menu>
//                     </div>
//                 </Toolbar>
//             </AppBar>
//             <Box my={4}>
//                 <Typography variant="h4" gutterBottom>
//                     Welcome, User!
//                 </Typography>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12} md={4}>
//                         <Paper>
//                             <Box p={2}>
//                                 <Typography variant="h6">Account Balance</Typography>
//                                 <Typography variant="h4">$5,000.00</Typography>
//                             </Box>
//                         </Paper>
//                     </Grid>
//                     <Grid item xs={12} md={8}>
//                         <Paper>
//                             <Box p={2}>
//                                 <Typography variant="h6">Recent Transactions</Typography>
//                                 <List>
//                                     <ListItem>
//                                         <ListItemIcon>
//                                             <ReceiptIcon />
//                                         </ListItemIcon>
//                                         <ListItemText primary="Transaction 1: -$100.00" />
//                                     </ListItem>
//                                     <ListItem>
//                                         <ListItemIcon>
//                                             <ReceiptIcon />
//                                         </ListItemIcon>
//                                         <ListItemText primary="Transaction 2: +$500.00" />
//                                     </ListItem>
//                                     {/* Add more transactions here */}
//                                 </List>
//                             </Box>
//                         </Paper>
//                     </Grid>
//                 </Grid>
//                 <Box mt={4}>
//                     <Button variant="contained" color="primary" startIcon={<TransferWithinAStationIcon />}>
//                         Transfer Funds
//                     </Button>
//                     <Button variant="contained" color="secondary" startIcon={<ReceiptIcon />} style={{ marginLeft: 10 }}>
//                         Pay Bills
//                     </Button>
//                 </Box>
//                 <Box mt={4}>
//                     <Typography variant="h6">Quick Links</Typography>
//                     <Divider />
//                     <List>
//                         <ListItem button>
//                             <ListItemIcon>
//                                 <AccountBalanceIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="View Accounts" />
//                         </ListItem>
//                         <ListItem button>
//                             <ListItemIcon>
//                                 <SettingsIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="Settings" />
//                         </ListItem>
//                     </List>
//                 </Box>
//             </Box>
//         </Container>
//     );
// };

// export default Dashboard;



// drawerContent

// const drawerContent = (
    //     <div style={{ backgroundColor: "#1A4631", height: "100%" }}>
    //         <Toolbar />
    //         <Divider />
    //         <Typography
    //             sx={{ textAlign: "left", pt: 3, pl: 4, pb: 2, color: "#FFD700", fontSize: 20 }}
    //         >
    //             NairaNest
    //         </Typography>
    //         <List>
    //             <ListItemButton sx={{ color: "white" }}>
    //                 <ListItemIcon sx={{ color: "white" }}>
    //                     <AccountBalanceIcon />
    //                 </ListItemIcon>
    //                 <ListItemText primary={"Home"} />
    //             </ListItemButton>
    //             <ListItemButton sx={{ color: "white" }}>
    //                 <ListItemIcon sx={{ color: "white" }}>
    //                     <AccountBoxIcon />
    //                 </ListItemIcon>
    //                 <ListItemText primary={"Accounts"} />
    //             </ListItemButton>
    //             <ListItemButton sx={{ color: "white" }}>
    //                 <ListItemIcon sx={{ color: "white" }}>
    //                     <ReceiptIcon />
    //                 </ListItemIcon>
    //                 <ListItemText primary={"Transactions"} />
    //             </ListItemButton>
    //             <ListItemButton sx={{ color: "white" }}>
    //                 <ListItemIcon sx={{ color: "white" }}>
    //                     <SettingsIcon />
    //                 </ListItemIcon>
    //                 <ListItemText primary={"Settings"} />
    //             </ListItemButton>
    //         </List>
    //     </div>
    // );
