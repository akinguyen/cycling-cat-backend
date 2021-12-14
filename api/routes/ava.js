const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const ava = require("../models/ava");

router.get("/", (req, res, next) => {
  ava
    .find()
    .select("name _id avaImage")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        avas: docs.map((doc) => {
          return {
            name: doc.name,
            avaImage: doc.avaImage,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/ava/" + doc._id,
            },
          };
        }),
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", upload.single("avaImage"), (req, res, next) => {
  const ava = new ava({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    avaImage: req.file.path,
  });
  ava
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created ava successfully",
        createdava: {
          name: result.name,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/ava/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:avaId", (req, res, next) => {
  const id = req.params.avaId;
  ava
    .findById(id)
    .select("name _id avaImage")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          ava: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/ava",
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:avaId", (req, res, next) => {
  const id = req.params.avaId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  ava
    .update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "ava updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/ava/" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:avaId", (req, res, next) => {
  const id = req.params.avaId;
  ava
    .remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "ava deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/ava",
          body: { name: "String" },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
