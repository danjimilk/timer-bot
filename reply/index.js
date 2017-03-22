const requestSender = require('request');

module.exports.send = function (channelAccessToken, replyToken, messages) {
	console.log('[Channel access token]', channelAccessToken);
	var headers = {
		'Content-type' : 'application/json',
		'Authorization' : 'Bearer ' + channelAccessToken
	};

	var options = {
		url: 'https://api.line.me/v2/bot/message/reply',
		method: 'POST',
		headers: headers,
		json: {
			replyToken : replyToken,
			messages : messages
		}
	};

	requestSender(options, function (error, response, body) {
	//	console.log('response', response.statusCode);

		if (!error && response.statusCode == 200) {
			console.log(body)
		} else {
			console.log('requestSender', error);	
		}
	});
};
