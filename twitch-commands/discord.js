module.exports = {
	name: 'discord',
	description: 'Generiert einen Discord Invite',
    usage: `discord` ,
	execute (channel, userstate, message, self, args, TwitchBot) {
        const { client, config} = require('../index')

    client.guilds.get("671004136325513237").channels.get("671004370313412628").createInvite()
    .then( i => 
        TwitchBot.say(channel,`@${userstate["display-name"]} -> ${i.url}`)
    )
    
			
	},
};