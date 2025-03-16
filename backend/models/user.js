const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "" },
  email: { type: String, required: true, default: "" },
  password: { type: String, required: true, default: "" },
  number: { type: String, default: "", default: "" },
})

module.exports = mongoose.model("User", userSchema);
