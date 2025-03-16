const express = require("express");
const buyStockController = require("../controllers/stock/buy");
const sellStockController = require("../controllers/stock/sell")
const middleware= require("../middlewares/user")

const router = express.Router();

router.post("/buy-stock", middleware,buyStockController.buyStock);
router.post("/sell-stock", middleware,sellStockController.sellStock);

module.exports = router;
