const mongoose = require('mongoose');
const { Schema } = mongoose;

const betSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'BettingEvent', required: true },
  selectedOption: { type: String, required: true },
  amount: { type: Number, required: true },
  placedAt: { type: Date, default: Date.now },
  isRewarded: { type: Boolean, default: false },
  rewardAmount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Bet', betSchema);
