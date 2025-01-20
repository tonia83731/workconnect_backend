const passport = require("passport");
// const LocalStrategy = require("passport-local")
const passportJWT = require("passport-jwt");
const bcrypt = require("bcryptjs");
const User = require("../models/user-models");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
);

module.exports = passport;
