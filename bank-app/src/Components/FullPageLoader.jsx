// FullPageLoader.jsx
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const FullPageLoader = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}
  >
    {/* <CircularProgress color="success" /> */}
    <CircularProgress 
    sx={{
        color: "#2dbe60", // custom color
    }}
     />
  </Box>
);

export default FullPageLoader;
