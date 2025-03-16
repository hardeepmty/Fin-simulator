const axios = require('axios');

const API_KEY = "cvb9q21r01qgjh40r2d0cvb9q21r01qgjh40r2dg"; 
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

exports.getStockQuote = async (req, res) => {
    try {
        const { symbol } = req.query;
        if (!symbol) return res.status(400).json({ error: "Stock symbol is required" });

        const url = `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching stock quote:", error);
        res.status(500).json({ error: "Failed to fetch stock data" });
    }
};

exports.getTopCompanies = async (req, res) => {
    try {
        const topCompanies = [
            { symbol: "AAPL", name: "Apple Inc." },
            { symbol: "MSFT", name: "Microsoft Corporation" },
            { symbol: "GOOGL", name: "Alphabet Inc. (Google)" },
            { symbol: "AMZN", name: "Amazon.com Inc." },
            { symbol: "TSLA", name: "Tesla Inc." },
            { symbol: "META", name: "Meta Platforms (Facebook)" },
            { symbol: "NVDA", name: "NVIDIA Corporation" },
            { symbol: "BRK.B", name: "Berkshire Hathaway Inc." },
            { symbol: "V", name: "Visa Inc." },
            { symbol: "JNJ", name: "Johnson & Johnson" }
        ];

        const stockDataPromises = topCompanies.map(async (company) => {
            const url = `${FINNHUB_BASE_URL}/quote?symbol=${company.symbol}&token=${API_KEY}`;
            const response = await axios.get(url);
            return {
                name: company.name,
                symbol: company.symbol,
                currentPrice: response.data.c,
                change: response.data.d,
                percentChange: response.data.dp,
                high: response.data.h,
                low: response.data.l,
                previousClose: response.data.pc
            };
        });

        const companyStockData = await Promise.all(stockDataPromises);
        res.json(companyStockData);

    } catch (error) {
        console.error("Error fetching top companies data:", error);
        res.status(500).json({ error: "Failed to fetch top companies data" });
    }
};

exports.getMarketNews = async (req, res) => {
    try {
        const url = `${FINNHUB_BASE_URL}/news?category=general&token=${API_KEY}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching market news:", error);
        res.status(500).json({ error: "Failed to fetch market news" });
    }
};


exports.getFnoData = async (req, res) => {
    try {
        const url = `${FINNHUB_BASE_URL}/stock/option-chain?symbol=AAPL&token=${API_KEY}`; // Replace symbol as needed
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching F&O data:", error);
        res.status(500).json({ error: "Failed to fetch F&O data" });
    }
};

exports.getIpoListings = async (req, res) => {
    try {
        const url = `${FINNHUB_BASE_URL}/calendar/ipo?token=${API_KEY}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching IPO listings:", error);
        res.status(500).json({ error: "Failed to fetch IPO listings" });
    }
};




