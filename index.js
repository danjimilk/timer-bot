const https = require('https');
const express = require('express');
const fs = require('fs');

const config = require('./config');

var app = express();

// set SSL
var https_options = {
    ca: fs.readFileSync(config.SSL.CA_PATH, 'utf8'),
    key: fs.readFileSync(config.SSL.KEY_PATH, 'utf8'),
    cert: fs.readFileSync(config.SSL.CERT_PATH, 'utf8')
};

https.createServer(https_options, app).listen(443, function(){
    console.log("Timer-bot is running");
});