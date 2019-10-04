const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys.js');
require('./models/User.js');
require('./services/passport.js');
// app is used to set up configuration that will listen for incoming requests and routes

mongoose.connect(keys.mongoURI, {useNewUrlParser: true});
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // cookies' expiration time (in milliseconds)
        keys: [keys.cookieKey] // uses array, will pick one randomly to encrypt cookie
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoute.js')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);