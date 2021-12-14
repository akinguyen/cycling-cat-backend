const mongoose = require("mongoose");
//const User = require("./user");

const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: String,
  location: String,
  category: String,
  time: String,
  creatorID: String,
  participants: [{ type: String }],
});

module.exports = mongoose.model("Event", eventSchema);
