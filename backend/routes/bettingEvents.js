const express = require('express');
const router = express.Router();
const bettingEventController = require('../controllers/betting/create');
const bettingEventControllerPlace = require('../controllers/betting/placeBet');
const getUserBets = require("../controllers/betting/getUserBets")
const getAllEvents = require("../controllers/betting/get")
const declareResults = require("../controllers/betting/declareResults")
const middleware= require("../middlewares/user")


router.post('/create', bettingEventController.create);
router.post('/:eventId/bet', middleware, bettingEventControllerPlace.placeBet);
router.get("/getMyBets",middleware,getUserBets.getUserBets)
router.get("/getAllEvents",getAllEvents.getAllEvents)
router.post("/events/:eventId/declare", declareResults.declareResult);


module.exports = router;
