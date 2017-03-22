const https = require('https');
const express = require('express');
const fs = require('fs');
const config = require('./config');
const bodyParser = require('body-parser');
const reply = require('./reply');
const comm = require('./comm');

var app = express();
app.use(bodyParser.json());

app.get('/hook', function (request, response) {
	response.sendStatus(200);	
});

app.post('/hook', function (request, response) {
	var eventObj = request.body.events[0];
    var source = eventObj.source;
    var message = eventObj.message;

    // Request log
    console.log('======================', new Date() ,'======================');
    console.log('[request]', request.body);
    console.log('[request source] ', eventObj.source);
	console.log('[request message]', eventObj.message);
	console.log('======================================================================');

	if ( message.type !== "text" || message.text.indexOf("help") != -1 ){
		reply.send(config.CHANNEL_ACCESS_TOKEN, eventObj.replyToken, comm.getHelp());
	} else {
		// Echo
		reply.send(config.CHANNEL_ACCESS_TOKEN, eventObj.replyToken, comm.echo(message.text));
	}

    response.sendStatus(200);
});

// Set credential information
var https_options = {
    ca: fs.readFileSync(config.SSL.CA_PATH, 'utf8'),
    key: fs.readFileSync(config.SSL.KEY_PATH, 'utf8'),
    cert: fs.readFileSync(config.SSL.CERT_PATH, 'utf8')
};

https.createServer(https_options, app).listen(443, function(){
    console.log("Timer-bot is running");
});
