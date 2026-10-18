const express = require("express");
const { readiness } = require("../Controllers/health.Controller");

const router = express.Router();

router.get("/", readiness);

module.exports = router;
