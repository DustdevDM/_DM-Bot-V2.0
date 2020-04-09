module.exports = {
	name: 'youtube',
	description: 'Sendet einen Link zu Dustin_DM\' YouTube Channel',
    usage: `youtube` ,
	execute (message, args, Bot) {
        const { client, config} = require('../index')

        Bot.say(`@${message.display_name} -> http://s.dustin-dm.de/rex`)
    
			
	},
};