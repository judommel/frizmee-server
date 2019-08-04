const mongoose = require("mongoose");

const FrizItem = mongoose.model("FrizItem", {
  title: String
});

module.exports = FrizItem;
