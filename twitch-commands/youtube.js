module.exports = {
	name: 'youtube',
	description: 'Sendet einen Link zu Dustin_DM\' YouTube Channel',
    usage: `youtube` ,
	execute (target, context, msg, self, TwitchBot) {
        const { client, config} = require('../index')

        TwitchBot.say(target,`@${context["display-name"]} -> http://s.dustin-dm.de/rex`)
    
			
	},
};