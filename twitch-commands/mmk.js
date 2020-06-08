module.exports = {
	name: 'mmk',
	description: 'Zeigt alle Infos zu Monday Mario Kart',
    usage: `mmk` ,
	execute (channel, userstate, message, self, args, TwitchBot) {
        const { client, config} = require('../index')

        TwitchBot.say(channel,`@${userstate["display-name"]} -> Monday Mario Kart ist ein wöchentliches Mario Kart 8 DX Turnier das wir auf dem Eat, Sleep, Nintendo, Repeat Discord Server veranstalten ( https://discord.gg/P2kKEd9 ). Wir freuen uns auf jeden Teilnehmer. Der Turnier Code lautet: 2442-6453-9691`)
    
			
	},
};