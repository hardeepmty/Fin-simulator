const BettingEvent = require("../../models/BettingEvent");
const User = require("../../models/user");
const Bet = require("../../models/Bet");

exports.placeBet = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { selectedOption, amount } = req.body;
    const userId = req.user._id;

    // Validate bet amount
    if (!selectedOption || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid bet data" });
    }

    // Fetch user and validate balance
    const user = await User.findById(userId);
    if (!user || user.vcBalance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Fetch betting event
    const event = await BettingEvent.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (event.isClosed) {
      return res.status(400).json({ message: "Betting closed for this event" });
    }

    // Find and update the selected outcome
    const outcomeIndex = event.outcomes.findIndex(o => o.option === selectedOption);
    if (outcomeIndex === -1) {
      return res.status(400).json({ message: "Invalid outcome selected" });
    }

    event.outcomes[outcomeIndex].totalBetAmount += amount;
    event.totalPool += amount;

    // Deduct user's balance
    user.vcBalance -= amount;
    await user.save();

    // Store the user's bet
    await Bet.create({
      user: userId,
      event: event._id,
      selectedOption,
      amount
    });

    // Recalculate multipliers
    event.outcomes = event.outcomes.map(o => {
      const multiplier = o.totalBetAmount > 0
        ? event.totalPool / o.totalBetAmount
        : 0;
      return {
        ...o.toObject(),
        multiplier: parseFloat(multiplier.toFixed(2))
      };
    });

    await event.save();

    res.status(200).json({
      message: "Bet placed successfully",
      updatedBalance: user.vcBalance,
      newOutcomes: event.outcomes
    });

  } catch (error) {
    console.error("Error placing bet:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
