const axios = require("axios");
const User = require("../../models/user");

const API_KEY = "cvb9q21r01qgjh40r2d0cvb9q21r01qgjh40r2dg"; 
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

exports.buyStock = async (req, res) => {
    try {
        const userId = req.user._id;
        const { symbol, amount } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const stockData = await axios.get(`${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`);
        const stockPrice = stockData.data.c;
        const totalCost = stockPrice * amount;

        if (user.vcBalance < totalCost) {
            return res.status(400).json({ error: "Insufficient VC" });
        }

        const existingStock = user.stocks.find(stock => stock.symbol === symbol);

        if (existingStock) {
            existingStock.shares += amount;
        } else {
            user.stocks.push({ symbol, shares: amount, purchasePrice: stockPrice });
        }

        user.vcBalance -= totalCost;

        await user.save();

        res.json({
            message: "Stock purchased successfully!",
            user
        });

    } catch (error) {
        console.error("Error buying stock:", error);
        res.status(500).json({ error: "Transaction failed" });
    }
};
