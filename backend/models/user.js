const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "" },
  email: { type: String, required: true, default: "" },
  password: { type: String, required: true, default: "" },
  number: { type: String, default: "", default: "" },
  vcBalance: { type: Number, default: 100 },
  role: { type: String, default: 'Beginner' },
  stocks: [{ symbol: String, shares: Number, purchasePrice: Number }],
  loans: [{
    amount: Number,
    interest: Number,
    dueDate: Date,
    repaid: Boolean,
    gracePeriodEnds: Date,  
  }]
})

module.exports = mongoose.model("User", userSchema);
