module.exports = {
	name: 'youtube',
	description: 'Sendet einen Link zu Dustin_DM\' YouTube Channel',
    usage: `youtube` ,
	execute (channel, userstate, message, self, args, TwitchBot) {
        const { client, config} = require('../index')

        TwitchBot.say(channel,`@${userstate["display-name"]} -> http://s.dustin-dm.de/rex`)
    
			
	},
};