const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "" },
  email: { type: String, required: true, default: "" },
  password: { type: String, required: true, default: "" },
  number: { type: String, default: "" }, 
  vcBalance: { type: Number, default: 100 },
  role: { type: String, default: 'Beginner' }, //'Admin' role is set for admin users
  stocks: [{ symbol: String, shares: Number, purchasePrice: Number }],
  socialStatus: { type: Number, default: 0 },
  ownedCollectibles: [
    {
      collectibleId: { type: mongoose.Schema.Types.ObjectId, ref: "Collectible" },
      name: String,
      category: String,
      price: Number,
      dailyReturn: Number,
      statusPoints: Number,
      purchaseDate: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
