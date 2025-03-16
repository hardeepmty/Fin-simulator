const express = require('express');
const { 
  getStockQuote,
  getTopCompanies,
  getMarketNews,
  getFnoData,
  getIpoListings,
} = require('../controllers/finnhub/stockController');

const router = express.Router();

router.get('/quote', getStockQuote);
router.get("/top-companies", getTopCompanies);
router.get("/news", getMarketNews);
router.get("/fno", getFnoData);
router.get("/ipos", getIpoListings);

module.exports = router;
