const userModel = require("../Models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
let secret = process.env.SECRET

const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const welcomeUser = (req, res) => {
    res.send("Welcome to the home page")
    console.log('Welcome to the home page');
}

// const registerUser = async(req, res) => {
//     // res.send("Welcome to the register user page");
//     let saltRound = 10
//     const {firstName, lastName, email, password} = req.body
//     const plainTextPassword = password;
//     const hashedPassword = bcrypt.hashSync(plainTextPassword, saltRound)
//     console.log(req.body);
//     let user = new userModel({firstName, lastName, email, password: hashedPassword})
//     user.save()
//     .then((result) => {
//         console.log(result);
//         console.log("User signed up and saved successfully");
//         res.status(200).json({Message: "Registration successful"});
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({Message: "Registration failed"});
//     });
// }

// const loginUser = async(req, res) => {
//     // res.send("Welcome to the login user page");
//     const {email, password} = req.body;

//     let user;
//     try {
//         user = await userModel.findOne({ email: email});
//         console.log('User found:', user);
//     }
//     catch (err) {
//         console.log('Error:', err);
//         console.log("User not found");
//     }

//     if (!user) {
//         console.log("User is not found");
//         res.status(404).json({
//             Message: 'User not found, sign up'
//         });
//     }

//     const correctPassword = bcrypt.compareSync(password, user.password);
//     console.log("Correct password:", correctPassword);

//     if(!correctPassword){
//         console.log("Wrong password, incorrect credentials");
//         res.status(403).json({
//             Message: 'Invalid credentials'
//         });
//     } else { 
//         const token = jwt.sign( {id: user._id}, secret, {expiresIn: "4h"})
//         res.status(200).json({
//             Message: 'Login successful',
//             token: token,
//             user: user
//         })
//         console.log("Login successful");
//     }
// }

const registerUser = async(req, res) => {
    const {firstName, lastName, email, password} = req.body;


    try {

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash password
        const saltRound = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRound);

        // Create new user
        const newUser = new userModel({ firstName, lastName, email, password: hashedPassword });
        
        // Save new user
        const result = await newUser.save();
        console.log("User signed up and saved successfully");
        console.log(result);
        res.status(200).json({ message: "Registration successful", user: result });
    } catch (error) {
        console.error("Error during registration:", error);

        // Handle unexpected errors
        res.status(500).json({ message: "Registration failed. Please try again later.", error: error.message });
    }
}


const loginAttempts = {}; // Keep track of login attempts by IP address

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const ip = req.ip;

    const key = `${email}:${ip}`;

    if (!loginAttempts[key]) {
        loginAttempts[key] = { count: 0, lastAttempt: Date.now() };
    }

    const attemptsLimit = 5;
    const lockoutTime = 300000;
    const warningLimit = 3;

    if (loginAttempts[key].count >= attemptsLimit && (Date.now() - loginAttempts[key].lastAttempt < lockoutTime)) { // 5 minutes lockout
        const retryAfter = lockoutTime - (Date.now() - loginAttempts[key].lastAttempt)
        return res.status(429).json({ message: 'Too many login attempts. Please try again later.', retryAfter });
    }

    try {
        // Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            loginAttempts[key].count += 1;
            loginAttempts[key].lastAttempt = Date.now();
            let warningMessage = ''
            if (loginAttempts[key].count >= warningLimit && loginAttempts[key].count < attemptsLimit) {
                warningMessage = `Warning: You have ${attemptsLimit - loginAttempts[key].count} attempts left before being locked out.`
            }
            return res.status(404).json({ message: 'User not found, sign up', warning: warningMessage });
        }

        // Check if password is correct
        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            loginAttempts[key].count += 1;
            loginAttempts[key].lastAttempt = Date.now();
            let warningMessage = '';
            if (loginAttempts[key].count >= warningLimit && loginAttempts[key].count < attemptsLimit) {
                warningMessage = `Warning: You have ${attemptsLimit - loginAttempts[key].count} attempts left before being locked out.`;
            }
            return res.status(403).json({ message: 'Invalid credentials', warning: warningMessage });
        }

        // Reset login attempts on successful login
        loginAttempts[key] = { count: 0, lastAttempt: Date.now() };

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: "30m" });

        // Send response with token and user details
        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: user
        });

    } catch (error) {
        // Handle error
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



// const dashboard = async(req, res) => {
//     // res.send("Welcome to the dashboard user page");
//     let token = req.headers.authorization.split(" ")[1];
//     console.log(token); // Log the token to the console

//     jwt.verify(token, secret, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.send({ status: false, Message: "Error verifying", result})
//         } else {
//             console.log(result);
//             res.send({ status: true, Message: "Welcome", result})
//         }
//     })
// }

const dashboard = async (req, res) => {
    try {
        // Extract the token from the request headers
        const token = req.headers.authorization.split(" ")[1];
        
        // Verify the token
        const decoded = jwt.verify(token, secret);
        
        // If token verification is successful, get the user ID from the decoded token
        const userId = decoded.id;
        
        // Find the user by ID in the database
        const user = await userModel.findById(userId);
        
        // If user is not found, send an error response
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        // If user is found, send the user details in the response
        res.status(200).json({ user: user });
    } catch (error) {
        // If an error occurs, send an error response
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};




module.exports = {welcomeUser, registerUser, loginUser, dashboard}