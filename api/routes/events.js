const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");
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
    category: req.body.category,
    location: req.body.location,
    time: req.body.time,
    creatorID: req.body.userId,
    participants: req.body.participants,
  });
  event
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        msg: "handling POST req to /events",
        event: event,
      });
    })
    .catch((err) => console.log(err));
});

router.get("/:ID", (req, res, next) => {
  const id = req.params.ID;
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
      category: req.body.newCategory,
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
