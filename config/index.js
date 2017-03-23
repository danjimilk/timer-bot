const fs = require('fs');

exports.SSL = {
	"CA_PATH": "./../timer-bot_com.ssl/timer-bot_com.ca-bundle",
	"KEY_PATH": "./../timer-bot_com.ssl/timer-bot_com.key",
	"CERT_PATH": "./../timer-bot_com.ssl/timer-bot_com.crt"
};

exports.CHANNEL_ACCESS_TOKEN = fs.readFileSync("./../timer-bot_com.ssl/line-channel-access-token", 'utf8').trim();
