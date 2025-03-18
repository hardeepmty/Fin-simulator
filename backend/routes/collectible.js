const express = require("express");
const getCollectibles = require('../controllers/collectible/get')
const buyCollectibles = require('../controllers/collectible/post')
const middleware= require("../middlewares/user")

const router = express.Router();

router.get("/collectibles", getCollectibles.getAllCollectibles);
router.post("/buy-collectible", middleware, buyCollectibles.buyAsset)

module.exports = router;
