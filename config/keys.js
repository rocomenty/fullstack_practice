// decide between dev vs. prod credentials

if (process.env.NODE_ENV == 'production') {
    module.exports = require('./prod');
} else {
    // in development env
    module.exports = require('./dev');
}