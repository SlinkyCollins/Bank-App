import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Link } from 'react-router-dom';


const SignUpp = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div style={{ display: "flex" }}>
            <div style={{ minHeight: "100vh", width: "50%", color: "#fff" }}>
                <div className="bg-image">
                    <img src="/src/assets/bg-img.jpg" style={{ width: "100%", height: "100vh", objectFit: "cover" }} />
                </div>
                <div style={{position: "absolute", top: "0", left: "0", padding: "3rem 0 0 5rem"}}>
                    <h1 style={{ fontSize: "2rem", fontWeight: "600"}}>NairaNest</h1>
                </div>
                <div style={{ position: "absolute", width: "50%", top: "50%", left: "50%", transform: "translate(-100%, -50%)", padding: "0 0 0 5rem"}}>
                    <div>
                        <h1 style={{ fontSize: "2.6rem", fontWeight: "600" }}>Get Verified!</h1>
                        <p style={{ fontSize: "1.1rem", marginTop: "1rem", width: "90%" }}>Every day, NairaNest makes thousands of customers happy.</p>  
                    </div>
                </div>
            </div>
            <div style={{ minHeight: "100vh", width: "50%", color: "#000", backgroundColor: "#f1f5f6", textAlign: "left", display: "flex", justifyContent: "center", alignItems: "center", margin: "0" }}>
                <div>
                    <h1 style={{ fontSize: "1.7rem", marginBottom: "1rem" }}>Sign Up</h1>
                    <Box
                        component="form"
                        sx={{
                            // '& > :not(style)': { m: 2 },
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <TextField fullWidth id="firstname" label="First Name" variant="outlined" margin="normal" style={{backgroundColor: "#fff"}} />
                        <TextField fullWidth id="lastname" label="Last Name" variant="outlined" margin="normal" style={{backgroundColor: "#fff"}} />
                        <TextField fullWidth id="email" label="Email" variant="outlined" margin="normal" style={{backgroundColor: "#fff"}} />
                        
                        <FormControl variant="outlined" margin="normal" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                style={{backgroundColor: "#fff"}}
                            />
                        </FormControl>

                        {/* <TextField fullWidth id="password" label="Password" variant="outlined" margin="normal" /> */}
                    </Box>

                    <Button style={{ backgroundColor: "#2dbe60", width: "100%", margin: "1rem 0", padding: ".8rem 0", fontWeight: "700" }} variant="contained">Sign Up</Button>
                    <p style={{ color: "#92a4af", textAlign: "center" }}>Already have an account? <Link to="/login"><span style={{ color: "#2dbe60" }}>Login</span></Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignUpp