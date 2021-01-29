const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("./models/User");

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

const JWTStrategy = new Strategy(option, async (payload, done) => {
  if (payload.role === "USER") {
    const targetUser = await User.findOne({ _id: payload.id });
    if (targetUser) {
      done(null, targetUser);
    } else {
      done(null, false);
    }
  }
});

passport.use("jwt", JWTStrategy);
