const express = require("express");
const router = express.Router();

//@GET /api/redirect/test

router.get("/test", (req, res) => res.json({ msg: "API is working" }));
//@route GET api/redirect

router.get("/", (req, res) => {
  const hash = req.headers.hash;

  URL.findOne({ _id: hash })
    .then((doc) => {
      return res.json({ url: doc.url });
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ error: "Sorry, this link may have expired" });
    });
});

module.exports = router;
