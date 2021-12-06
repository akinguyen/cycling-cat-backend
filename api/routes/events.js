const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    description: "this is my event",
    sport: "badminton",
    location: "BKU",
    time: "Friday - 3:00pm",
  });
});

module.exports = router;
