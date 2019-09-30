const express = require('express');

// app is used to set up configuration that will listen for incoming requests and routes
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);