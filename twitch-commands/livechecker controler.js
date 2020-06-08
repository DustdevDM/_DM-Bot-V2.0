module.exports = {
	name: 'on',
	description: 'Ein Command un den Live Checker des Bots zu manipulieren',
    usage: `on (off)` ,
	execute (channel, userstate, message, self, args, TwitchBot) {
		if(userstate["user-id"] == "179697954"){
		const {livelistner} = require("../twitch-events/livechecker")

		if (args[0]){
			livelistner.emit("offline")
		}
		else {
			livelistner.emit("live")
		}
	}
	else {
		TwitchBot.say(channel, "Du hast leider keine Berechtigung diesen Command zu benutzen")
	}
    
			
	},
};