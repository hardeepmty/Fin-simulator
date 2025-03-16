const axios = require("axios");
const User = require("../../models/user");

const API_KEY = "cvb9q21r01qgjh40r2d0cvb9q21r01qgjh40r2dg"; 
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

exports.sellStock = async (req, res) => {
    try {
        const userId = req.user._id ;
        const { symbol, amount } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const stockIndex = user.stocks.findIndex(stock => stock.symbol === symbol);
        if (stockIndex === -1) return res.status(400).json({ error: "Stock not found in portfolio" });

        const userStock = user.stocks[stockIndex];

        if (userStock.shares < amount) {
            return res.status(400).json({ error: "Not enough shares to sell" });
        }

        const stockData = await axios.get(`${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`);
        const stockPrice = stockData.data.c;
        const totalSaleValue = stockPrice * amount;

        user.vcBalance += totalSaleValue;
        userStock.shares -= amount;

        if (userStock.shares === 0) {
            user.stocks.splice(stockIndex, 1);
        }

        await user.save();

        res.json({
            message: "Stock sold successfully!",
            user
        });

    } catch (error) {
        console.error("Error selling stock:", error);
        res.status(500).json({ error: "Transaction failed" });
    }
};
