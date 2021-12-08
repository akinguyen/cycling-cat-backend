const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Event = require("../models/events");

router.get("/", (req, res, next) => {
  Event.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  const event = new Event({
    _id: new mongoose.Types.ObjectId(),
    description: req.body.description,
    sport: req.body.sport,
    location: req.body.location,
    time: req.body.time,
  });
  event
    .save()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
  res.status(201).json({
    msg: "handling POST req to /events",
    event: event,
  });
});

router.get("/:eventID", (req, res, next) => {
  const id = req.params.eventID;
  Event.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:eventID", (req, res, next) => {
  const id = req.params.eventID;
  Event.updateOne(
    { _id: id },
    {
      description: req.body.newDescription,
      sport: req.body.newSport,
      location: req.body.newLocation,
      time: req.body.newTime,
    }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/:eventID", (req, res, next) => {
  const id = req.params.eventID;
  Event.remove({ _id: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
module.exports = router;
