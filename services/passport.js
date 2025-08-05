const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys  = require('../config/keys')

const User = mongoose.model('users');


passport.serializeUser((user, done) => {
  // Save user id to session
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Retrieve user from session using id
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// register passport middleware
passport.use(new googleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true // Use proxy for callback URL 
  }, async (acceessToken, refreshToken, profile, done)=>{

    User.findOne({googleId: profile.id}).then((existingUser) => {
      if (existingUser) {
        // User already exists
        done(null, existingUser);
        console.log("User already exists", existingUser);
      }
      else{
        // User does not exist, create a new one
        new User({ googleId: profile.id }).save().then((newUser) => {
          done(null, newUser);
        });
        console.log("New user created", profile.id);
      }

    })
    console.log("User see", profile.id)


  }

));