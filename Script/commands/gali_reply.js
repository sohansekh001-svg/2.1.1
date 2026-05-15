const fs = require("fs");
module.exports.config = {
	name: "gali",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️", 
	description: "no prefix",
	commandCategory: "no prefix",
	usages: "abal",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Shahadat Bokasoda")==0 || event.body.indexOf("Sahadat mc")==0 || event.body.indexOf("chod")==0 || event.body.indexOf("Sohan nodir pola")==0 || event.body.indexOf("bc")==0 || event.body.indexOf("Sohan re chudi")==0 || event.body.indexOf("shahadat re chod")==0 || event.body.indexOf("Sohan Abal")==0 || event.body.indexOf("Sohan Boakachoda")==0 || event.body.indexOf("Sohan madarchod")==0 || event.body.indexOf("Sohan re chudi")==0 || event.body.indexOf("Sohan Bokachoda")==0) {
		var msg = {
				body: "তোর মতো বোকাচোদা খানকির ছেলে রে আমার বস সোহান চু*দা বাদ দিছে🤣\nসাহু এখন আর hetars চুষে না🥱😈",
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
