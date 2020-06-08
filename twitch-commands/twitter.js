module.exports = {
	name: 'twitter',
	description: 'Sendet einen Link zu Dustin_DM\' Twitter Account',
    usage: `twitter` ,
	execute (channel, userstate, message, self, args, TwitchBot) {
        const { client, config} = require('../index')

        TwitchBot.say(channel,`@${userstate["display-name"]} -> https://twitter.com/Dustin_DM_`)
    
			
	},
};