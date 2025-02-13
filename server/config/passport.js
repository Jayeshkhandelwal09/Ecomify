const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}api/auth/google/callback`, 
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Checking if user already exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // If user doesn't exist, create a new one
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            favourites: [],
          });
        }

        done(null, { user });
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Serialize and deserialize user for session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
module.exports = passport;
