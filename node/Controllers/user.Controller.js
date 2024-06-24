const userModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require('crypto');
require("dotenv").config();
let secret = process.env.SECRET;

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const welcomeUser = (req, res) => {
  res.send("Welcome to the home page");
  console.log("Welcome to the home page");
};

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

// Create a transporter object using SMTP transport

// Function to send an email
// const sendEmail = async( to, subject, text ) => {
//     const mailOptions = {
//         from: process.env.USER_EMAIL, // Sender address
//         to, // List of receivers
//         subject,  // Subject line
//         text, // Plain text body
//     };

//     try {
//         // Send mail with defined transport object
//         await transporter.sendMail(mailOptions);
//         console.log('Email sent successfully');
//     } catch (error) {
//         console.error("Error sending email:", error);
//     }
// };

const sendMail = async (email, firstName) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL, // Dev's Email address
        pass: process.env.USER_PASS, // Dev's App Password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  
    let emailText = `Hello ${firstName},\n\nWe're glad to have you onboard.\n\nBest,\nThe NairaNest Team`;
  
    const mailOptions = {
      from: process.env.USER_EMAIL, // Sender address
      to: email, // List of receivers
      subject: "Welcome to NairaNest!", // Subject line
      text: emailText, // Plain text body
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (err) {
      console.error("Error sending mail: " + err);
    }
  };

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

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
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save new user
    const result = await newUser.save();
    console.log("User signed up and saved successfully");

    // Send a welcome email to the user
    await sendMail(email, firstName);

    console.log(result);
    res.status(200).json({ message: "Registration successful", user: result });

  } catch (error) {
    console.error("Error during registration:", error);

    // Handle unexpected errors
    res
      .status(500)
      .json({
        message: "Registration failed. Please try again later.",
        error: error.message,
      });
  }
};

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

  if (
    loginAttempts[key].count >= attemptsLimit &&
    Date.now() - loginAttempts[key].lastAttempt < lockoutTime
  ) {
    // 5 minutes lockout
    const retryAfter =
      lockoutTime - (Date.now() - loginAttempts[key].lastAttempt);
    return res
      .status(429)
      .json({
        message: "Too many login attempts. Please try again later.",
        retryAfter,
      });
  }

  try {
    // Find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      loginAttempts[key].count += 1;
      loginAttempts[key].lastAttempt = Date.now();
      let warningMessage = "";
      if (
        loginAttempts[key].count >= warningLimit &&
        loginAttempts[key].count < attemptsLimit
      ) {
        warningMessage = `Warning: You have ${
          attemptsLimit - loginAttempts[key].count
        } attempts left before being locked out.`;
      }
      return res
        .status(404)
        .json({ message: "User not found, sign up", warning: warningMessage });
    }

    // Check if password is correct
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      loginAttempts[key].count += 1;
      loginAttempts[key].lastAttempt = Date.now();
      let warningMessage = "";
      if (
        loginAttempts[key].count >= warningLimit &&
        loginAttempts[key].count < attemptsLimit
      ) {
        warningMessage = `Warning: You have ${
          attemptsLimit - loginAttempts[key].count
        } attempts left before being locked out.`;
      }
      return res
        .status(403)
        .json({ message: "Invalid credentials", warning: warningMessage });
    }

    // Reset login attempts on successful login
    loginAttempts[key] = { count: 0, lastAttempt: Date.now() };

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "30m" });

    // Send response with token and user details
    res.status(200).json({
      message: "Login successful",
      token: token,
      user: user,
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




  const sendResetMail = async (email, resetUrl) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  
    const emailText = `Hello,\n\nYou requested to reset your password. Please click the link below to reset your password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.\n\nBest,\nThe NairaNest Team`;
  
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Request for a Password Reset",
      text: emailText,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (err) {
      console.error("Error sending mail: " + err);
    }
  };
  
  const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
      user.resetPasswordToken = resetTokenHash;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
      await user.save();
  
      const resetUrl = `https://bank-app-livid-seven.vercel.app/reset-password/${resetToken}`; // Ensure this points to your deployed frontend
      await sendResetMail(email, resetUrl);
  
      res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      console.error('Error sending reset email:', error);
      res.status(500).json({ message: 'Error sending reset email' });
    }
  };

  const sendResetConfirmationEmail = async (email) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const emailText = `Hello,\n\nYour password has been successfully reset. If you did not initiate this change, please contact support immediately.\n\nBest,\nThe NairaNest Team`

    const mailOptions = {
        from: "no-reply",
        to: email,
        subject: "Password Reset Successful",
        text: emailText,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Confirmation email sent successfully");
    } catch (err) {
        console.error("Error sending confirmation email: " + err);
    }
  };
  
  const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
      const user = await userModel.findOne({
        resetPasswordToken: resetTokenHash,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      user.password = bcrypt.hashSync(newPassword, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();

      await sendResetConfirmationEmail(user.email);  // Send confirmation email
      
      res.status(200).json({ message: 'Password reset successful' });

    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Error resetting password' });
    }
  };
  

module.exports = {
  welcomeUser,
  registerUser,
  loginUser,
  dashboard,
  sendMail,
  forgotPassword,
  resetPassword,
  sendResetMail,
  sendResetConfirmationEmail,
};
