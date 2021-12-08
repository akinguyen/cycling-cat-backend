const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const morgan = require("morgan");

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://cat:cat@cluster0.nup90.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then((result) => console.log("Connected to MongoDb"))
  .catch((err) => console.log(err));

const eventRouter = require("./api/routes/events");

//MiddleWare
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(morgan("dev"));

//Prevent CORS And Allow PUT,POST,DELETE,PATCH,GET
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH, GET");
    return res.status(200).json({});
  }
  next();
});

app.get("/", function (_, res) {
  return res.status(200).json({ msg: "YES" });
});

app.use("/events", eventRouter);

module.exports = app;
