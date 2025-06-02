const mongoose = require('mongoose');

const outcomeSchema = new mongoose.Schema({
  option: { type: String, required: true }, // e.g., 'India wins'
  multiplier: { type: Number, default: 1 }, // Will be updated dynamically
  totalBetAmount: { type: Number, default: 0 } // How much money is bet on this outcome
});

const bettingEventSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., 'India vs Australia ODI Final'
  description: { type: String },
  eventDate: { type: Date, required: true },
  totalPool: { type: Number, default: 0 },
  outcomes: [outcomeSchema],
  winner: { type: String, default: null }, // e.g., "India wins"
  isClosed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('BettingEvent', bettingEventSchema);
