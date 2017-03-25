module.exports.sendHelpMsg = function () {
	var messages = [];

	var i = 0;
	while (i < 5) {
		messages[i] = {};
		i++;
	}

	messages[0].type = 'text';
	messages[0].text = 'Here are commands: \n\n/help, /h: Show you bot help.';
	messages[1].type = 'text';
	messages[1].text = '/[num]: \nAdd or modify the default alarm with the input number. (unit:min.)\n\n/[name] [num]: \nAdd or modify an alarm that has the name you defined.';
	messages[2].type = 'text';
	messages[2].text = '/list, /l: \nList all alarms (include default alarm) with their remain time.\n\n/[name]: \nDisplay the alarm you specified.';
	messages[3].type = 'text';
	messages[3].text = '/clear: \nClear all alarms.\n\n/rm [name]: \nRemove the specified alarm.';
	messages[4].type = 'text';
	messages[4].text = 'This bot is under development. These commands will not work correctly now. The commands implemented not yet, will work as echo message. If you need more help, contact me. (danji_milk@naver.com)';

	console.log('[Help message]', messages);
	return messages;
}

module.exports.sendEchoMsg = function(userMessage) {
	var messages = [];
	messages[0] = {};
	messages[0].type = 'text';
	messages[0].text = userMessage;

	messages[1] = {};
	messages[1].type = 'text';
	messages[1].text = 'Bad command, I just repeated your message. For more information, input \'\/help\''

	return messages;	
}

module.exports.sendErrorMsg = function() {
	var messages = [];
	messages[0] = {};
	messages[0].type = 'text';
	messages[0].text = 'I cannot understand your command. Please see help (\'\/help\')';

	return messages;
}

module.exports.sendSuccessMsgforAddedAlarm = function(alarmName) {
	var messages = [];
	messages[0] = {};
	messages[0].type = 'text';
	messages[0].text = 'I set alarm \'' + alarmName + '\'. I will remind you on time.';

	return messages;
}

module.exports.sendAlarmInfo = function (alarmList) {
	var messages = [];
	messages[0] = {};

	if (alarmList.length == 0) {
		messages[0].type = 'text';
		messages[0].text = 'I have no alarm or I cannot find the alarm that has the given name.';
	}
	else {
		messages[0].type = 'text';
		messages[0].text = 'Your alarm list:';
		
		messages[1] = {};
		messages[1].type = 'text';
		messages[1].text = '';
		
		var remainTime = 0;

		for (var i=0; i < alarmList.length; i++) {
			remainTime = alarmList[i].expTime - (new Date()).getTime();
			remainMin = Math.floor(remainTime / 60 / 1000);
			remainSec = Math.floor(remainTime / 1000) - (remainMin * 60);
			messages[1].text = messages[1].text + '- ' + alarmList[i].name + ': ' + remainMin + 'm ' + remainSec + 's left.';

			if (i != (alarmList.length - 1)) {
				messages[1].text = messages[1].text + '\n';
			}
		}
	}

	return messages;
}

module.exports.sendSuccessMsgforClearingAllAlarms = function () {
	var messages = [];
	messages[0] = {};
	messages[0].type = 'text';
	messages[0].text = 'I removed all alarms.';

	return messages;
}

module.exports.sendSuccessMsgforRemovingAlarm = function (targetAlarmName) {
	var messages = [];
	messages[0] = {};
	messages[0].type = 'text';
	messages[0].text = 'Alarm \'' + targetAlarmName + '\' has been removed.';

	return messages;
}

module.exports.sendAlarm = function (targetAlarmName) {
	var messages = [];
	messages[0] = {};
	messages[0].type = 'text';
	messages[0].text = 'Time`s up. (Alarm \'' + targetAlarmName + '\')';

	return messages;
}
