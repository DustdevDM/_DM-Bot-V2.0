module.exports = {
	name: 'discord',
	description: 'Generiert einen Discord Invite',
    usage: `discord` ,
	execute (target, context, msg, self, TwitchBot) {
        const { client, config} = require('../index')

    client.guilds.get("671004136325513237").channels.get("671004370313412628").createInvite()
    .then( i => 
        TwitchBot.say(target,`@${context["display-name"]} -> ${i.url}`)
    )
    
			
	},
};