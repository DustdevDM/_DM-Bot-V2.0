module.exports = {
	name: 'on',
	description: 'Ein Command un den Live Checker des Bots zu manipulieren',
    usage: `on (off)` ,
	execute (target, context, msg, self, TwitchBot, args) {
		if(context["user-id"] == "179697954"){
		const {livelistner} = require("../twitch-events/livechecker")

		if (args[0]){
			livelistner.emit("offline")
		}
		else {
			livelistner.emit("live")
		}
	}
	else {
		TwitchBot.say(target, "Du hast leider keine Berechtigung diesen Command zu benutzen")
	}
    
			
	},
};