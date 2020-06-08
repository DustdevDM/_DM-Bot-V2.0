module.exports = {
	name: 'fc',
	description: 'Schickt Dustins Freundescode von der Nintendo Switch',
    usage: `fc` ,
	execute (channel, userstate, message, self, args, TwitchBot) {
        const { client, config} = require('../index')

        TwitchBot.say(channel,`@${userstate["display-name"]} -> SW-5759-3138-7199
`)
    
			
	},
};
