const mongoose = require("mongoose");

const Friz = mongoose.model("Friz", {
  title: String,
  pinned: Boolean,
  quantity: Number,
  date: Date,
  location: String
});

module.exports = Friz;
