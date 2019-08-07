const express = require("express");
const router = express.Router();

const Friz = require("./models/Friz");
const FrizItem = require("./models/FrizItem");

router.get("/", async (req, res) => {
    try {
      const frizes = await Friz.find();
  
      const frizList = await FrizItem.find();
  
      const dataToSend = { frizes: frizes, frizList: frizList };
  
      return res.json(dataToSend);
    } catch (error) {
      console.log(error);
      res.status(400).json("Couldn't find your freezer list.");
    }
  });
  
  // router.get("/frizlist", async (req, res) => {
  //   try {
  //     const frizList = await FrizItem.find();
  
  //     return res.status(200).json(frizList);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).json("Couldn't find your freezer item list.");
  //   }
  // });
  
  router.post("/create", async (req, res) => {
    try {
      const friz = new Friz({
        title: req.body.title,
        done: false,
        pinned: false,
        quantity: req.body.quantity,
        date: Date.now()
      });
  
      await friz.save();
  
      const frizItem = await FrizItem.findOne({ title: friz.title });
  
      if (frizItem === null) {
        const newItem = new FrizItem({ title: friz.title });
  
        await newItem.save();
      }
  
      return res.json(friz);
    } catch (error) {
      console.log(error);
      res.status(400).json("Error. Unable to create.");
    }
  });
  
  router.post("/pin", async (req, res) => {
    try {
      const friz = await Friz.findById(req.body.id);
  
      if (friz === null) {
        return res.status(400).json({ message: "No matching task" });
      } else {
        friz.pinned = !friz.pinned;
  
        await friz.save();
  
        const frizes = await Friz.find();
  
        return res.json(frizes);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json("Error");
    }
  });
  
  router.post("/update", async (req, res) => {
    try {
      const friz = await Friz.findById(req.body.id);
  
      if (friz === null) {
        return res.status(400).json({ message: "No matching task" });
      } else {
        friz.quantity = friz.quantity - 1;
  
        if (friz.quantity === 0) {
          friz.remove();
        } else {
          await friz.save();
        }
  
        const frizes = await Friz.find();
  
        return res.json(frizes);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json("Error");
    }
  });
  
  router.post("/delete", async (req, res) => {
    try {
      const friz = await Friz.findById(req.body.id);
  
      if (friz === null) {
        return res.status(400).json({ message: "No matching product" });
      } else {
        await friz.remove();
  
        const frizes = await Friz.find();
  
        return res.json(frizes);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json("Error");
    }
  });

  module.exports = router;