module.exports = {
	name: 'twitter',
	description: 'Sendet einen Link zu Dustin_DM\' Twitter Account',
    usage: `twitter` ,
	execute (target, context, msg, self, TwitchBot) {
        const { client, config} = require('../index')

        TwitchBot.say(target,`@${context["display-name"]} -> https://twitter.com/Dustin_DM_`)
    
			
	},
};