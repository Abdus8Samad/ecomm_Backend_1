const passport = require('passport'),
localStrategy = require('passport-local'),
User = require('../models/user');

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new localStrategy(User.createStrategy()));