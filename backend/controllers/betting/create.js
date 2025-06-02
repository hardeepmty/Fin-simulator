const BettingEvent = require('../../models/BettingEvent');

exports.create = async (req, res) => {
  try {
    const { title, description, eventDate, outcomes } = req.body;

    if (!title || !eventDate || !Array.isArray(outcomes) || outcomes.length < 2) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const formattedOutcomes = outcomes.map(option => ({
      option,
      multiplier: 1,
      totalBetAmount: 0
    }));

    const newEvent = new BettingEvent({
      title,
      description,
      eventDate,
      outcomes: formattedOutcomes
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
