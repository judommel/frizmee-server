const mongoose = require("mongoose");


const FrizTip = mongoose.model("FrizTip", {
    title : String,
    tip : String,
    author : String,
    maxDuration : String
})

module.exports = FrizTip