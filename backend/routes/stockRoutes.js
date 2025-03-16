const express = require('express');
const { getStockQuote } = require('../controllers/finnhub/stockController');

const router = express.Router();

router.get('/quote', getStockQuote);

module.exports = router;
