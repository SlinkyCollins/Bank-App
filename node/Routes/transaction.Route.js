const express = require("express")
const router = express.Router()
const authMiddleware = require("../Middleware/authMiddleware")
const {deposit, withdraw, transfer, getTransactions} = require("../Controllers/transaction.Controller")

router.post("/deposit", authMiddleware, deposit);
router.post("/withdraw", authMiddleware, withdraw);
router.post("/transfer", authMiddleware, transfer);
router.get("/getTransactions", authMiddleware, getTransactions);

module.exports = router;