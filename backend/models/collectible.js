const mongoose = require("mongoose");

const collectibleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Land", "Private Jet", "Yacht", "Painting", "Gold"], required: true },
  price: { type: Number, required: true },
  dailyReturn: { type: Number, required: true }, // % earnings per day
  statusPoints: { type: Number, required: true }, // Social status points
});

module.exports = mongoose.model("Collectible", collectibleSchema);
