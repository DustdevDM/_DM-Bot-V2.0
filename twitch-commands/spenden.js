module.exports = {
	name: 'spenden',
	description: 'Sendet einen Link zu Dustin_DM\'s Tipee Page',
    usage: `spenden` ,
	execute (target, context, msg, self, TwitchBot) {
        const { client, config} = require('../index')

        TwitchBot.say(target,`@${context["display-name"]} -> https://www.tipeeestream.com/dustin-dm/donation`)
    
			
	},
};
