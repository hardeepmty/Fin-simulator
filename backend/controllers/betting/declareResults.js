const BettingEvent = require("../../models/BettingEvent");
const Bet = require("../../models/Bet");
const User = require("../../models/user");

exports.declareResult = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { winningOption } = req.body;

    // Fetch the event
    const event = await BettingEvent.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.isClosed) {
      return res.status(400).json({ message: "Event already closed" });
    }

    // Validate outcome
    const outcome = event.outcomes.find(o => o.option === winningOption);
    if (!outcome) {
      return res.status(400).json({ message: "Invalid winning option" });
    }

    const multiplier = outcome.multiplier;

    // Fetch all winning bets
    const winningBets = await Bet.find({ event: eventId, selectedOption: winningOption });

    // Reward each user
    for (const bet of winningBets) {
      const reward = parseFloat((bet.amount * multiplier).toFixed(2));
      await User.findByIdAndUpdate(bet.user, { $inc: { vcBalance: reward } });
    }

    // Mark event as closed
    event.winner = winningOption;
    event.isClosed = true;
    await event.save();

    res.status(200).json({
      message: "Result declared and rewards distributed",
      totalWinners: winningBets.length,
      winningOption,
      multiplier
    });

  } catch (error) {
    console.error("Error declaring result:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
