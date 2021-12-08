const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: String,
  location: String,
  sport: String,
  time: String,
});

module.exports = mongoose.model("Event", eventSchema);
