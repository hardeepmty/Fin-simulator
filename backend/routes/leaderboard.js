const express = require('express');
const router = express.Router();
const leaderBoardController  = require('../controllers/leaderboard/get');

router.get('/leads', leaderBoardController.leaderBoard);

module.exports = router;