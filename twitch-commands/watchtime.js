module.exports = {
	name: 'watchtime',
	description: 'Sendet Informationen darüber wie lang du schon dem Kanal zuschaust',
    usage: `watchtime` ,
	async execute (channel, userstate, message, self, args, TwitchBot) {
        const { client, config} = require('../index')
		const VIEWER = require("../Models/VIEWER")
		var db = await VIEWER.find({"twitch": userstate["user-id"]})
		if (db.length = 0){ return TwitchBot.say(channel,`@${userstate["display-name"]} -> Ich konnte keine Daten zu dir in meiner Database finden`) }

        TwitchBot.say(channel,`@${userstate["display-name"]} -> Du hast ${Math.floor(db[0].watchtime)} Stunden mit Dustin verbracht PogChamp`)
    
			
	},
};