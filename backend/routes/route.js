const express = require("express");
const Stocks = require("./stockRoutes")
const auth = require("./auth")

const router = express.Router();

router.use("/stocks", Stocks)
router.use("/auth", auth)

module.exports = router;
