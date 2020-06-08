module.exports = {
	name: 'spenden',
	description: 'Sendet einen Link zu Dustin_DM\'s Tipee Page',
    usage: `spenden` ,
	execute (channel, userstate, message, self, args, TwitchBot) {
        const { client, config} = require('../index')

        TwitchBot.say(channel,`@${userstate["display-name"]} -> https://www.tipeeestream.com/dustin-dm/donation`)
    
			
	},
};
