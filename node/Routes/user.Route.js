const express = require("express")
const router = express.Router()
const {welcomeUser, registerUser, loginUser, dashboard, sendMail} = require("../Controllers/user.Controller")

router.get("/user", welcomeUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/sendmail", sendMail);
router.get("/dashboard", dashboard);

module.exports = router;