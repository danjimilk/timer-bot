module.exports.getHelp = function () {
	var messages = [];

	var i = 0;
	while (i < 5) {
		messages[i] = {};
		i++;
	}

	messages[0].type = 'text';
	messages[0].text = 'Here are commands: \n\n/help: Show you help';
	messages[1].type = 'text';
	messages[1].text = '/[number]: \nAdd simple alarm (default alarm) with the input number. (unit:min.)\n\n/[name] [number]: \nAdd an alarm that has the name you defined.';
	messages[2].type = 'text';
	messages[2].text = '/list: \nList all alarms (include default alarm) with theri remain time.\n\n/[name]: \nDisplay the alarm that has name you input.';
	messages[3].type = 'text';
	messages[3].text = '/clear: \nRemove all alarms.\n/clear [name]: \n\nRemove the alarm that has name you input.';
	messages[4].type = 'text';
	messages[4].text = 'If you need more help. Contact me. (danji_milk@naver.com)';

	console.log('[Help message]', messages);
	return messages;
}

module.exports.echo = function(userMessage) {
	var messages = [];
	messages[0] = {};
	messages[0].type = 'text';
	messages[0].text = userMessage;

	return messages;	
}
