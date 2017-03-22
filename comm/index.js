module.exports.getHelp = function () {
	var messages = [];
	messages[0] = {};
	messages[0].type = 'text';
	messages[0].text = 'Here are commands: \n' +
		'help: Show you help\n' +
		'##[text],[number]: Set simple alarm. The text you input regards as title of alarm and the number is the amount of time (in minutes) for alarm.  e.g. ##Meeting alarm, 60\n' +
		'##[text]: List the alarm you specified and show you how much time is left.\n' +
		'##[text],r: Remove the alarm you specified.\n' +
		'##r: Remove all alarms you created';


	return messages;
}

module.exports.echo = function(userMessage) {
	var messages = [];
	messages[0] = {};
	messages[0].type = 'text';
	messages[0].text = userMessage;

	return messages;	
}
