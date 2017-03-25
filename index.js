const https = require('https');
const express = require('express');
const fs = require('fs');
const config = require('./config');
const bodyParser = require('body-parser');
const reply = require('./reply');
const comm = require('./comm');
const alarmUtil = require('./alarmUtil');

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

	if ( message.type !== "text" ){
		// Show help when user inputs message not as text.
		reply.send(config.CHANNEL_ACCESS_TOKEN, eventObj.replyToken, comm.sendHelpMsg());
	}
	else if (message.text.startsWith('/')){
		var timerCmd = message.text.substring(1, message.text.length);
		var cmdArgs = timerCmd.split(' ');

		if (cmdArgs.length == 1) {
			// Check whether the first arguments is number type or not.
			if (!isNaN(parseInt(cmdArgs[0]))){
				// Add simple alarm (default alarm)
				alarmUtil.addAlarm("default", cmdArgs[0], eventObj.replyToken);
				alarmUtil.listAlarmsToConsole();
				reply.send(config.CHANNEL_ACCESS_TOKEN, eventObj.replyToken, comm.sendSuccessMsgforAddedAlarm("default"));
			}
			else {
				// Text type command, command stand-alone type.
				if (cmdArgs[0] === 'h' || cmdArgs[0] == 'help'){
					// Process help command.
					reply.send(config.CHANNEL_ACCESS_TOKEN, eventObj.replyToken, comm.sendHelpMsg());
				}
				else if (cmdArgs[0] === 'list' || cmdArgs[0] == 'l') {
					// Process list command. List information of all alarms (name and remain time).
					alarmUtil.listAlarmsToConsole();
					reply.send(config.CHANNEL_ACCESS_TOKEN, eventObj.replyToken, comm.sendAlarmInfo(alarmUtil.listAlarms()));
				}
				else if (cmdArgs[0] === 'clear') {
					// Process clear command, means clear all.
					alarmUtil.clearAllAlarms();
					alarmUtil.listAlarmsToConsole();
					reply.send(config.CHANNEL_ACCESS_TOKEN, eventObj.replyToken, comm.sendSuccessMsgforClearingAllAlarms());
				}
				else {
					// Get specific alarm information.
					alarmUtil.listAlarmsToConsole();
					reply.send(config.CHANNEL_ACCESS_TOKEN, eventObj.replyToken, comm.sendAlarmInfo(alarmUtil.findAlarm(cmdArgs[0])));
				}

			}
		}
		else if (cmdArgs.length ==2) {
			if (cmdArgs[0] === 'rm' && isNaN(parseInt(cmdArgs[1]))) {
				var findResult = alarmUtil.findAlarm(cmdArgs[1]);
				if (findResult.length == 0) {
					alarmUtil.listAlarmsToConsole();
					reply.send(config.CHANNEL_ACCESS_TOKEN, eventObj.replyToken, comm.sendAlarmInfo(findResult));
				}
				else {
					alarmUtil.removeAlarm(cmdArgs[1]);
					alarmUtil.listAlarmsToConsole();
					reply.send(config.CHANNEL_ACCESS_TOKEN, eventObj.replyToken, comm.sendSuccessMsgforRemovingAlarm(cmdArgs[1]));
				}
			}
			else if ( (isNaN(parseInt(cmdArgs[0]))) && (!isNaN(parseInt(cmdArgs[1]))) ){
				// Add alarm 
				alarmUtil.addAlarm(cmdArgs[0], cmdArgs[1], eventObj.replyToken);
				alarmUtil.listAlarmsToConsole();
				reply.send(config.CHANNEL_ACCESS_TOKEN, eventObj.replyToken, comm.sendSuccessMsgforAddedAlarm(cmdArgs[0]));
			}
			else {
				reply.send(config.CHANNEL_ACCESS_TOKEN, eventObj.replyToken, comm.sendErrorMsg());
			}
		}
		else {
			reply.send(config.CHANNEL_ACCESS_TOKEN, eventObj.replyToken, comm.sendErrorMsg());
		}
		
	}
	else {
		// Echo
		reply.send(config.CHANNEL_ACCESS_TOKEN, eventObj.replyToken, comm.sendEchoMsg(message.text));
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
    console.log("Timer-bot is running.");
});
