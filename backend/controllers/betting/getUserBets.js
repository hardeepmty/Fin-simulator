const BettingEvent = require('../../models/BettingEvent');
const User = require('../../models/user');
const Bet = require("../../models/Bet")


exports.getUserBets = async (req, res) => {
  try {
    const bets = await Bet.find({ user: req.user._id }).populate('event');
    res.status(200).json(bets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not fetch bets' });
  }
};
