module.exports = {
	name: 'twitter',
	description: 'Sendet einen Link zu Dustin_DM\' Twitter Account',
    usage: `twitter` ,
	execute (message, args, Bot) {
        const { client, config} = require('../index')

        Bot.say(`@${message.display_name} -> http://twitter.dustin-dm.de`)
    
			
	},
};