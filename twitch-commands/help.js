module.exports = {
	name: 'help',
	description: 'Schickt eine übersicht aller Commands in den Chat',
    usage: `fc` ,
	execute (channel, userstate, message, self, args, TwitchBot) {
        const { client, config} = require('../index')

            TwitchBot.say("Befehls Liste: " + client.twitchcommands.map(cmd => cmd.name).join(", "))
        
        

        
    	
	},
};
