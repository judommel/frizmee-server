const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/frizmee",
  {
    useNewUrlParser: true
  }
);


const frizRoutes = require("./routes/friz-routes");
app.use(frizRoutes);

const tipRoutes = require("./routes/tip-routes");
app.use(tipRoutes);



app.listen(process.env.PORT || 3001, () => {
  console.log("Los geht's");
});
