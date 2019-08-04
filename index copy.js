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

const Friz = require("./models/Friz");

app.get("/", async (req, res) => {
  try {
    const friz = await Friz.find();

    return res.json(friz);
  } catch (error) {
    console.log(error);
    res.status(400).json("Couldn't find your to do list.");
  }
});

app.post("/create", async (req, res) => {
  try {
    const friz = new Friz({
      title: req.body.title,
      done: false
    });

    await friz.save();

    return res.json(friz);
  } catch (error) {
    console.log(error);
    res.status(400).json("Error with Friz");
  }
});

app.post("/update", async (req, res) => {
  try {
    const friz = await Friz.findById(req.body.id);

    if (friz === null) {
      return res.status(400).json({ message: "No matching task" });
    } else {
      friz.done = !friz.done;

      await friz.save();

      const friz = await Friz.find();

      return res.json(friz);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("Error");
  }
});

app.post("/delete", async (req, res) => {
  try {
    const friz = await Friz.findById(req.body.id);

    if (friz === null) {
      return res.status(400).json({ message: "No matching task" });
    } else {
      await friz.remove();

      const friz = await Friz.find();

      return res.json(friz);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("Error");
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Los geht's");
});
