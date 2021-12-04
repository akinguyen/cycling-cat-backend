const express = require("express");
const app = express();
//const mongoose = require("mongoose");
//const db = require("./config/keys").mongoURI;
const bodyParse = require("body-parser");
const morgan = require("morgan");

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
  return res.status(200).json({ msg: "Success" });
});

app.get("/events", function (_, res) {
  return res.status(200).json({
    events: [{ name: "Sup" }, { name: "Hello" }, { name: "Bla Bla" }],
  });
});

/*
mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
*/

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Running Server at " + port));
