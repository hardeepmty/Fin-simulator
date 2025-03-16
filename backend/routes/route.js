const express = require("express");
const Stocks = require("./stockRoutes")
const auth = require("./auth")
const stockBuySell = require("./stock")

const router = express.Router();

router.use("/stocks", Stocks)
router.use("/auth", auth)
router.use("/stockex", stockBuySell)

module.exports = router;
