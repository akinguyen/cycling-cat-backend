const mongoose = require("mongoose");

const avachema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  userImage: { type: String, required: true },
});

module.exports = mongoose.model("ava", avaSchema);
