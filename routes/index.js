var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const Tweet = require("../models/Tweet.model");
const User = require("../models/User.model");
const {
  isLoggedIn,
  isNotLoggedIn,
} = require("../middleware/middleware.js");
const saltRounds = 10;


//feed (home) get
router.get('/', (req, res) => {
  res.render('feed.hbs')
})

//feed(home) get, [LOGGED IN]
router.get("/feed-loggedIn",isLoggedIn,(req,res)=>{
  res.render("feed-loggedIn.hbs")
})

// Login get
router.get("/login", (req, res) => {
  res.render("login.hbs");
});

//Login Post

router.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.send("All fields are mandatory. Please provide your username and password");
    return;
  }

})

// Signup get
router.get("/signup", (req, res) => {
  res.render("signup.hbs");
});
// Signup Post
router.post("/signup", (req, res, next) => {
  if (!req.body.username || !req.body.password ||
    !req.body.email) {
    res.render("signup", {
      errorMessage:
        "All fields are mandatory. Please provide your       username and password.",
    });
    return;
  }
  User.findOne({ username: req.body.username })
    .then(() => {
      return bcryptjs.genSalt(saltRounds);
    })
    .then((salt) => {
      return bcryptjs.hash(req.body.password, salt);
    })
    .then((hashedPassword) => {
      return User.create({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
      });
    })
    .then((createdUser) => {
      console.log("created user: ", createdUser);
      req.session.currentUser = createdUser;
      res.redirect("/feed-loggedIn");
    }) //fix username repeat error
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(500).render("/signup", { errorMessage: err.message });
      } else if (err.code === 11000) {
        res.status(500).render("/signup", {
          errorMessage:
            "Username needs to be unique. Username  is already used.",
        });
      } else {
        next(err);
      }
    })
})
module.exports = router