const userModel = require("../Models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
let secret = process.env.SECRET

const welcomeUser = (req, res) => {
    res.send("Welcome to the home page")
    console.log('Welcome to the home page');
}

const registerUser = async(req, res) => {
    // res.send("Welcome to the register user page");
    let saltRound = 10
    const {firstName, lastName, email, password} = req.body
    const plainTextPassword = password;
    const hashedPassword = bcrypt.hashSync(plainTextPassword, saltRound)
    console.log(req.body);
    let user = new userModel({firstName, lastName, email, password: hashedPassword})
    user.save()
    .then((result) => {
        console.log(result);
        console.log("User signed up and saved successfully");
        res.status(200).json({Message: "Registration successful"});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({Message: "Registration failed"});
    });
}

const loginUser = async(req, res) => {
    // res.send("Welcome to the login user page");
    const {email, password} = req.body;

    let user;
    try {
        user = await userModel.findOne({ email: email});
        console.log('User found:', user);
    }
    catch (err) {
        console.log('Error:', err);
        console.log("User not found");
    }

    if (!user) {
        console.log("User is not found");
        res.status(404).json({
            Message: 'User not found, sign up'
        });
    }

    const correctPassword = bcrypt.compareSync(password, user.password);
    console.log("Correct password:", correctPassword);

    if(!correctPassword){
        console.log("Wrong password, incorrect credentials");
        res.status(403).json({
            Message: 'Invalid credentials'
        });
    } else { 
        const token = jwt.sign( {id: user._id}, secret, {expiresIn: "1h"})
        res.status(200).json({
            Message: 'Login successful',
            token: token,
            user: user
        })
        console.log("Login successful");
    }
}

const dashboard = async(req, res) => {
    // res.send("Welcome to the dashboard user page");
    let token = req.headers.authorization.split(" ")[1];
    console.log(token); // Log the token to the console

    jwt.verify(token, secret, (err, result) => {
        if (err) {
            console.log(err);
            res.send({ status: false, Message: "Error verifying", result})
        } else {
            console.log(result);
            res.send({ status: true, Message: "Welcome", result})
        }
    })
}


module.exports = {welcomeUser, registerUser, loginUser, dashboard}