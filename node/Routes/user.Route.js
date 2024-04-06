const express = require("express")
const router = express.Router()
const {welcomeUser, registerUser, loginUser} = require("../Controllers/user.Controller")

router.get("/user", welcomeUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;