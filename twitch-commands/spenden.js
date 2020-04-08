module.exports = {
	name: 'spenden',
	description: 'Sendet einen Link zu Dustin_DM\' Tipee Page',
    usage: `sepnden` ,
	execute (message, args, Bot) {
        const { client, config} = require('../index')

        Bot.say(`@${message.display_name} -> https://www.tipeeestream.com/dustin-dm/donation`)
    
			
	},
};
