const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const edit = async (req, res) => {
  const userId = req.user._id;
  const targetUser = await User.findOne({ _id: userId });
  if (!targetUser) {
    res.status(400).send({ message: "Sorry something went wrong" });
  } else {
    await targetUser.update({
      ...req.body
    });
    res.status(200).send({ message: "updating success" });
  }
  res.status(200).send({ message: "update" });
};

const Register = async (req, res) => {
  const { username, password } = req.body;
  const targetUser = await User.findOne({ username });
  if (targetUser) {
    res.status(400).send({ message: "This username has been chosen" });
  } else {
    bcryptjs.genSalt(Number(process.env.SALT_ROUND), async (err, salt) => {
      if (err) {
        res.status(400).send({ message: "Sorry something went wrong" });
      } else {
        bcryptjs.hash(password, salt, async (err, hashedPw) => {
          if (err) {
            console.log(err);
            res.status(400).send({ message: "Sorry something went wrong" });
          } else {
            try {
              await User.create({
                ...req.body,
                password: hashedPw,
              });
              res.status(200).send({ message: "say yes" });
            } catch (err) {
              console.log(err);
              res.status(400).send("Sorry something went wrong");
            }
          }
        });
      }
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const targetUser = await User.findOne({ username });
  if (!targetUser) {
    res.status(400).send({ message: "username or password is wrong" });
  } else {
    bcryptjs.compare(password, targetUser.password, async (err, result) => {
      if (err) {
        res.status(400).send({ message: "Sorry something went wrong" });
      } else {
        const payload = {
          name: targetUser.name,
          id: targetUser.id,
          role: "USER",
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 36000,
        });
        res.status(200).send({ token, message: "Login success", role: payload.role });
      }
    });
  }
};

module.exports = {
  Register,
  login,
  edit
};
