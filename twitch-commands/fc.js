module.exports = {
	name: 'fc',
	description: 'Schickt Dustins Freundescode von der Nintendo Switch',
    usage: `fc` ,
	execute (target, context, msg, self, TwitchBot) {
        const { client, config} = require('../index')

        TwitchBot.say(target,`@${context["display-name"]} -> SW-5759-3138-7199
`)
    
			
	},
};
