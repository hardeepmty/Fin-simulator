const express = require("express");
const Stocks = require("./stockRoutes")
const auth = require("./auth")
const stockBuySell = require("./stock")
const collectible = require("./collectible")
const leaderboard= require("./leaderboard")
const user = require("./user");

const router = express.Router();

router.use("/stocks", Stocks)
router.use("/auth", auth)
router.use("/stockex", stockBuySell)
router.use("/collectible",collectible)
router.use("/leaderboard",leaderboard)
router.use(user) ;

module.exports = router;
