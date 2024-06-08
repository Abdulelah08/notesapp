const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Adjust the path as needed
const bcrypt = require('bcrypt-nodejs')

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id).exec()
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });
  
passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, async (req, email, password, done) => {
  try {
    if (req.body.password != req.body.confirm_password) {
      return done(null, false, req.flash('error', 'Passwords do not match'));
    }

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return done(null, false, req.flash('error', 'Email already used'));
    }
    
    
    
    const newUser = new User({
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)), // Use the instance method
      phone: req.body.phone,
      name: req.body.name
    });

    const savedUser = await newUser.save();
    return done(null, savedUser, req.flash('success', 'User Added'));
  } catch (err) {
    console.error(err);
    return done(err);
  }
}));



passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, async (req, username, password, done) => {
    try {
      const user = await User.findOne({ email: username }).exec();
  
      if (!user) {
        return done(null, false, req.flash('error', 'User was not found'));
      }
  
      if (user.comparePasswords(password, user.password)) {
        return done(null, user, req.flash('success', 'Welcome back'));
      } else {
        return done(null, false, req.flash('error', 'Password is wrong'));
      }
    } catch (err) {
      console.error(err);
      return done(err);
    }
  }));
  
