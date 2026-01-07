const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const { addBeneficiary, removeBeneficiary, getBeneficiaries } = require("../Controllers/beneficiary.Controller");

router.post("/", authMiddleware, addBeneficiary);
router.delete("/:id", authMiddleware, removeBeneficiary);
router.get("/", authMiddleware, getBeneficiaries);

module.exports = router;