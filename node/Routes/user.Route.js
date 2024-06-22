const express = require("express")
const router = express.Router()
const {welcomeUser, registerUser, loginUser, dashboard, sendMail, forgotPassword, resetPassword, sendResetMail, sendResetConfirmationEmail} = require("../Controllers/user.Controller")

router.get("/user", welcomeUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/sendresetmail", sendResetMail);
router.post("/sendmail", sendMail);
router.post("/sendresetconfirmationemail", sendResetConfirmationEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword) // Ensure this is a POST request
router.get("/dashboard", dashboard);

module.exports = router;