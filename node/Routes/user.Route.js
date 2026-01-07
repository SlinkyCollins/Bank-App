const express = require("express")
const router = express.Router()
const authMiddleware = require("../Middleware/authMiddleware")
const {welcomeUser, registerUser, loginUser, dashboard, getProfile, updateProfile, sendMail, forgotPassword, resetPassword, sendResetMail, sendResetConfirmationEmail, updatePassword} = require("../Controllers/user.Controller")

router.get("/user", welcomeUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/sendresetmail", sendResetMail);
router.post("/sendmail", sendMail);
router.post("/sendresetconfirmationemail", sendResetConfirmationEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword) // Ensure this is a POST request
router.get("/dashboard", authMiddleware, dashboard);
router.get("/get-profile", authMiddleware, getProfile);
router.put("/update-profile", authMiddleware, updateProfile);
router.put("/update-password", authMiddleware, updatePassword);

module.exports = router;