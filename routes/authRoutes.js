const route = require("express").Router();
const passport = require("passport");
const controller = require("../controllers/authController");

passport.serializeUser(function (user, done) {
  console.log("Hello this is serialize");
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

route.post("/register", controller.Register);
route.post("/login", controller.login);
route.patch("/edit/", passport.authenticate('jwt', { session: false }), controller.edit);

module.exports = route;
