const { client, config} = require('../index.js')
const { RichEmbed } = require('discord.js')
var schedule = require('node-schedule');
const Main = require('../index.js')
var fs = require(`fs`);

const {twitch_bot} = require("../twitch")

var guild = "671004136325513237";
var welcomechannel = "673196373172158474"
var ruleschan = {channel: "671007946280402944", msg: "671008041428320267"}

var VIEWERDB = require("../Models/VIEWER")

client.on("guildMemberAdd",async (user) => {
    if (user.user.bot) return user.addRole("671005872067182602")
    var VIEWERFROMDB = await VIEWERDB.find({"discord": user.id})
    //New Member
    if (VIEWERFROMDB.length == 0){
    user.guild.createChannel(user.displayName, "text", [
		{id: user.guild.defaultRole.id,deny: ['VIEW_CHANNEL'],},
		{id: user.id,allow: ['VIEW_CHANNEL'],},
    ],).then(async channel => {
        channel.setTopic(user.id)
        channel.setParent(welcomechannel)
            //fetch rules
            var rules = ""
           var firstmsg = channel.send(new RichEmbed().setColor("#0984e3").setTitle("Willkommen " + user.displayName).setDescription(`Willkommen auf ${user.guild.name} ^^. Auf diesem Server dreht sich alles um Streams von Dustin_DM und mehr von ihm`))
           var rulemsg = channel.send(new RichEmbed().setColor("#00cec9").setTitle("Schau dir mal die Regeln an.").setDescription("```Einen Moment bitte. Ich lade die Regeln herunter... ^^```"))
           var acceptrules = channel.send(new RichEmbed().setColor("#00b894").setTitle("Ende des Tutorials:").setDescription("Alles okay soweit? Dann bist du hiermit am Ende des Tutorials angelangt. Jetzt musst du nur noch auf das ✅ drücken um auf das nächste Level zu kommen und um die Regeln zu akzeptieren")).then(m => m.react("✅"))
           user.guild.channels.get(ruleschan.channel).fetchMessage(ruleschan.msg).then(m => rules = m.content.replace("Discord Nutzervereinbarung", "[Discord Nutzervereinbarung](https://discordapp.com/terms)"))
            rulemsg.then(m => m.edit(new RichEmbed().setColor("#00cec9").setTitle("Schau dir mal die Regeln an.").setDescription(rules)))
        })
}
    //Rejoined Member
    else {     
             user.guild.channels.get("671004370313412628").send(new RichEmbed().setDescription(`<@${user.id}` + "> ist gerade der _DM Crew beigetreten\n**Willkommen zurück^^**")
            .setColor("RANDOM")
            .setThumbnail(user.user.displayAvatarURL))
            user.guild.members.get(user.id).addRole("671005488632037397")
    }
})

client.on("messageReactionAdd",async (Reaction, User) => {
    if (Reaction.message.channel.parentID != welcomechannel) return;
    if (Reaction.emoji.name != "✅") return;
    if (User.bot) return
    var channel = Reaction.message.channel.id

        var messages = Reaction.message.channel.fetchMessages({limit: 5}).then(m => Reaction.message.channel.bulkDelete(m))

        Reaction.message.channel.send(new RichEmbed().setColor("#55efc4").setTitle("**Wir bereiten deine Ankunft vor:**")
        .setDescription("Bitte warte einen kurzen Moment"))

        var NEWVIEWER = new VIEWERDB({discord: User.id}).save()
       
        .then(
            
            Reaction.message.guild.channels.get("671004370313412628").send(new RichEmbed().setDescription(`<@${User.id}` + "> ist gerade der _DM Crew beigetreten")
            .setColor("RANDOM")
            .setThumbnail(User.displayAvatarURL))
        )
        setTimeout(() => {
            Reaction.message.guild.members.get(User.id).addRole("671005488632037397").then(
                Reaction.message.channel.delete()
            )
        }, 6000)

 
        
})

client.on("guildMemberRemove", (user) => {
    if (user.roles.has("671005488632037397") == false){return;}
    if (user.guild.id != "671004136325513237"){return;}
    client.guilds.get(user.guild.id).
    channels.get("671004370313412628").send(new RichEmbed().setDescription(`${user.user.tag} hat gerade die _DM Crew verlassen`).setColor("RANDOM").setThumbnail(user.user.displayAvatarURL))

})


