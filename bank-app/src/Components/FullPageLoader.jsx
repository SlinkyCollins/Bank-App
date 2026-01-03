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
    <CircularProgress 
    sx={{
        color: "#4a90e2", 
    }}
     />
  </Box>
);

export default FullPageLoader;
