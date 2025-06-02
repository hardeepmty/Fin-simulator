const BettingEvent = require("../../models/BettingEvent");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await BettingEvent.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching betting events:", error);
    res.status(500).json({ message: "Failed to fetch betting events" });
  }
};
