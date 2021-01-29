const route = require("express").Router();
const controller = require("../controllers/authController");

route.post("/register", controller.Register);
route.post("/login", controller.login);

module.exports = route;
