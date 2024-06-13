// import React from 'react'

// const Homepage = () => {
//   return (
//     <div>Homepage</div>
//   )
// }

// export default Homepage







import { Container, Typography, Button, AppBar, Toolbar, CssBaseline, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link, NavLink } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Homepage.css'; // Import your custom CSS file

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h2: {
      fontSize: '2rem',
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
    },
    h5: {
      fontSize: '1rem',
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
    },
  },
});

const Homepage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <div  style={{ display: "flex", flexDirection: "column", marginRight: "2rem"}}>
            <Link to="/"><img src="/src/assets/logo.png" style={{width: "7rem", borderRadius: "50%", cursor: "pointer"}} /></Link>
          </div>
          <Typography variant="h6" component="div" sx={{marginRight: "1rem", fontSize: ".9rem", cursor: "pointer"}}>
            HOME
          </Typography>
          <Typography variant="h6" component="div" sx={{marginRight: "1rem", fontSize: ".9rem", cursor: "pointer"}}>
            ABOUT US
          </Typography>
          <Typography variant="h6" component="div" sx={{marginRight: "1rem", fontSize: ".9rem", cursor: "pointer"}}>
            SERVICES
          </Typography>
          <Typography variant="h6" component="div" sx={{marginRight: "1rem",fontSize: ".9rem", cursor: "pointer"}}>
            CONTACT
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,fontSize: ".9rem", display: "flex", alignItems: "center" , cursor: "pointer"}}>
            FEATURES
            <KeyboardArrowDownIcon 
            fontSize='medium'
            color='default'
             />
          </Typography>
          <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
            <Link to="/login">
              <Button color="inherit" variant='outlined' style={{fontWeight: "600"}}>Login</Button>
            </Link>
            <Link to="/signup">
              <Button color="primary" variant='contained' style={{fontWeight: "600"}}>Sign Up</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: '50px' }}>
        <Box textAlign="center" padding={2}>
          <Typography variant="h2" gutterBottom>
            Welcome to NairaNest
          </Typography>
          <Typography variant="h5" paragraph>
            Your trusted partner in managing and growing your finances.
          </Typography>
          <Button variant="contained" color="primary" size="large" style={{ margin: '10px' }}>
            Get Started
          </Button>
          <Button variant="outlined" color="secondary" size="large" style={{ margin: '10px' }}>
            Learn More
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Homepage;