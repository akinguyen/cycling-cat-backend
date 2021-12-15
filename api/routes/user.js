const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Event = require("../models/events");

router.get("/", (req, res, next) => {
  User.find()
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

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(200).json({
          message: "Mail exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              info: {
                name: "",
                school: "",
                stuID: "",
                birthday: "",
              },
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ error: err });
              });
          }
        });
      }
    })
    .catch();
});

router.get("/:userId", (req, res, next) => {
  const _id = req.params.userId;
  User.findById(_id)
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

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Incorrect email",
          token: null,
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Incorrect password",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            "12345678@@@@@@",
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Login successfully",
            token: token,
            userData: user[0],
          });
        }
        res.status(401).json({
          message: "Login failed",
          token: null,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:userId", (req, res, next) => {
  User.updateOne(
    { _id: req.params.userId },
    {
      info: {
        name: req.body.newInfo.newName,
        school: req.body.newInfo.newSchool,
        stuID: req.body.newInfo.newStuID,
        birthday: req.body.newInfo.newBirthday,
      },
    }
  )
    .exec()
    .then((result) => {
      User.findOne({ _id: req.params.userId })
        .then((user) => {
          console.log({
            result: result,
            user: user,
          });
          res.status(200).json({
            result: result,
            user: user,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
