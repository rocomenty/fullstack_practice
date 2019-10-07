const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js');

const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id); // .id refers to the automatically generated id by mongoDB
});

passport.deserializeUser((id, done) => { // id is the token
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
        },

        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                // already have a record with given profile id
                // done function: done (ERROR, Mongoose Instance)
                return done(null, existingUser);
            }
            const user = await new User({ googleId: profile.id }).save(); // a mongoose instance gets returned after saving (then passed in to user)
            done(null, user);
        }
    )
);