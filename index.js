const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys.js');
require('./models/User.js');
require('./models/Survey.js');
require('./services/passport.js');
// app is used to set up configuration that will listen for incoming requests and routes

mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // cookies' expiration time (in milliseconds)
        keys: [keys.cookieKey] // uses array, will pick one randomly to encrypt cookie
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoute.js')(app);
require('./routes/billingRoute.js')(app);
require('./routes/surveyRoute.js')(app);

if (process.env.NODE_ENV === 'production') {
    // Make sure express will serve production assets from React
    // such as main.js or main.css
    app.use(express.static('client/build'));

    // Express will serve the index.html file if it does not
    // recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);