const comm = require('./../comm');
const config = require('./../config');
const reply = require('./../reply');

var alarmList = new Array();

module.exports.addAlarm = function (targetAlarmName, time, replyToken) {

	// Find alarm name in alarmList to check whether the alarm name already exist or not. And if same alarm name exist in alarmList, it will update with new on.
	var i;
	for (i = 0; i < alarmList.length; i++) {
		if (alarmList[i].name === targetAlarmName) {
			// Remove the previous alarm timeout function.
			clearTimeout(alarmList[i].timeoutPointer);
			break;
		}
	}


	var alarmSize = time * 60 * 1000;

	// Set the added alarm information in object
	var alarm = {};
	alarm.name = targetAlarmName;
	alarm.expTime = (new Date()).getTime() + alarmSize;
	alarm.timeoutPointer = setTimeout(function(targetAlarmName, replyToken) {

			console.log(targetAlarmName + ' alarm has been expired');
			reply.send(config.CHANNEL_ACCESS_TOKEN, replyToken, comm.sendAlarm(targetAlarmName));

			// Remove the expired alarm info.
			for (var i = 0; i < alarmList.length; i++) {
				if (alarmList[i].name === targetAlarmName) {
					if (alarmList[i].expTime > (new Date()).getTime()) { 
						clearTimeout(alarmList[i].timeoutPointer);
					}
				alarmList.splice(i, 1);
				}
			}

		}, alarmSize, alarm.name, replyToken);

	alarmList[i] = alarm;
}

module.exports.listAlarms = function () {
	return alarmList;
}

module.exports.removeAlarm = function (targetAlarmName) {
	for (var i = 0; i < alarmList.length; i++) {
		if (alarmList[i].name === targetAlarmName) {
			if (alarmList[i].expTime > (new Date()).getTime()) { 
				clearTimeout(alarmList[i].timeoutPointer);
			}
			alarmList.splice(i, 1);
		}
	}
}

module.exports.clearAllAlarms = function () {
	for (var i = 0; i < alarmList.length; i++) {
		if (alarmList[i].expTime > (new Date()).getTime()) { 
			clearTimeout(alarmList[i].timeoutPointer);
		}
	}
	alarmList.splice(0, alarmList.length);
}

module.exports.findAlarm = function (targetAlarmName) {
	var retAlarm = new Array();
	for (var i = 0; i < alarmList.length; i++) {
		if (alarmList[i].name === targetAlarmName) {
			retAlarm[0] =  alarmList[i];
			return retAlarm;
		}
	}
	return retAlarm;
}

module.exports.listAlarmsToConsole = function () {
	console.log('================= Alarm List ================');
	for (var i = 0; i < alarmList.length; i++) {
		console.log('Alarm Name: ', alarmList[i].name);
		console.log('Alarm Expiration: ', alarmList[i].expTime);
		console.log('Alarm Timeout Pointer: ', (typeof alarmList[i].timeoutPointer !== "undefined" || alarmList[i].timeoutPointer !== null));
	}
	console.log('=============================================');
}
