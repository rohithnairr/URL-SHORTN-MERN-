//Require
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Load URL model
//Init
const app = express();

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database key
const db = require("./config/keys").mongoURI;

//connecting to the mongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.log(err));

//Routes
const shorten = require("./routes/api/shorten");
app.use("/api/shorten", shorten);

const redirect = require("./routes/api/redirect");
app.use("/api/redirect", redirect);

app.get("/:hash", (req, res) => {
  const id = req.params.hash;
  //console.log(id);
  URL.findOne({ _id: id }, (err, doc) => {
    if (doc) {
      console.log(doc.url);
      res.redirect(doc.url);
    } else {
      res.redirect("/");
    }
  });
});

//Path
app.get("/", (req, res) => {
  res.send("Hello ");
});

//Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
