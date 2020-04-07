module.exports = {
	name: 'discord',
	description: 'Generiert einen Discord Invite',
    usage: `discord` ,
	execute (message, args, Bot) {
        const { client, config} = require('../index')

    client.guilds.get("671004136325513237").channels.get("671004370313412628").createInvite()
    .then( i => 
        Bot.say(`@${message.display_name} -> ${i.url}`)
    )
    
			
	},
};