const express = require("express");
const router = express.Router();
const uniqid = require("uniqid");

//Load URL model
const URL = require("../../models/Urls");
router.use((req, res, next) => {
  res.header("Access-Control-Allow-origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

//@route GET /api/shorten/test

router.get("/test", (req, res) => res.json({ msg: "API is working" }));

//@route POST api/shorten
router.post("/", (req, res) => {
  console.log(req.body);
  if (req.body.url) {
    urlData = req.body.url;
  }
  console.log("url is :", urlData);
  //check url already exists

  URL.findOne({ url: urlData }, (err, doc) => {
    if (doc) {
      console.log("entry found it in db");
      return res.json({
        url: doc.url,
        hash: doc._id,
      });
    } else {
      console.log("this is a new URL");
      const webaddress = new URL({
        _id: uniqid(),
        url: urlData,
      });
      webaddress.save((err) => {
        if (err) {
          return console.error(err);
        }
        res.send({
          url: urlData,
          hash: webaddress._id,

          status: 200,
          statusText: "OK",
        });
      });
    }
  });
});

module.exports = router;
