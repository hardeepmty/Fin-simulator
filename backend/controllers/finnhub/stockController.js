const axios = require('axios');

exports.getStockQuote = async (req, res) => {
    try {
        const { symbol } = req.query; 

        if (!symbol) {
            return res.status(400).json({ error: "Stock symbol is required" });
        }

        const API_KEY = "cvb9q21r01qgjh40r2d0cvb9q21r01qgjh40r2dg"; 
        const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;

        const response = await axios.get(url);
        res.json(response.data); 

    } catch (error) {
        console.error("Error fetching stock quote:", error);
        res.status(500).json({ error: "Failed to fetch stock data" });
    }
};


