const { client, config} = require('../index.js')
const { RichEmbed } = require('discord.js')
var schedule = require('node-schedule');
const Main = require('../index.js')
var fs = require(`fs`);

const wait = require('util').promisify(setTimeout);

var guild = "671004136325513237";
var ruleschan = {channel: "671007946280402944", msg: "671008041428320267"}


/////New Member -> Add Channel, send Message with Rules, (Welcome Back)
client.on("guildMemberAdd", async (member) => {
setTimeout(() => {    if (!member.user.bot && member.guild.id == guild){
    member.guild.createChannel(member.user.username, "text").then(async channel => {

        channel.replacePermissionOverwrites({
            overwrites: [
                {
                    id: client.guilds.get(guild).defaultRole.id,
                    deny: ['VIEW_CHANNEL', "SEND_MESSAGES"],
                },
                {
                    id: member.id,
                    allow: ['VIEW_CHANNEL'],
                },
            ],
        });

       
        channel.setParent("673196373172158474")

        var rules = ""
        await channel.guild.channels.get(ruleschan.channel).fetchMessage(ruleschan.msg).then(rulemessage => {
        rules = rulemessage.cleanContent 
        })


        channel.send(
            new RichEmbed()
            .setColor(0x4cd137)
.setThumbnail(member.guild.iconURL)
.setTitle("Hey " + member.user.username)
.setDescription(
  "Hey und Willkommen bei der _DM Crew! Bitte ließ dir kurz die Regeln durch:\n\n" + rules.replace("Discord Nutzervereinbarung", "[Discord Nutzervereinbarung](https://discordapp.com/guidelines)").replace("Discord Lizenzvereinbarung" , "[Discord Lizenzvereinbarung](https://discordapp.com/terms)") + "\n\n Hmm. Was gibts noch zu sagen...\nNichts?\nWorauf wartest du dann noch? Drück auf das ✅ um die Regeln zu akzeptieren!")
.setFooter("Um die Regeln zu akzeptiren, drücke auf das >✅<. Dann bekommst du Zugriff auf weitere Teile des Servers.")
        ).then(message => message.react("✅"))
        
        
    
})
}

})

client.on('messageReactionAdd',async (messageReaction, user) => {
if (messageReaction.message.channel.parentID != "673196373172158474"){return}
if (messageReaction.emoji == "✅" && user.bot == false){

    

    try {
    var guild = messageReaction.message.guild

        
    var NMember = messageReaction.message.guild.members.get(user.id)
    NMember.addRole(guild.roles.get("671005488632037397"))
    messageReaction.message.channel.delete()

    var joinedembed = new RichEmbed().setDescription(`<@${NMember.id}` + "> ist gerade in der _DM CREW angekommen")
    .setColor("RANDOM")
    .setThumbnail(user.displayAvatarURL)


    guild.channels.find(x => x.name === "willkommen").send(joinedembed)

        
    client.user.setActivity(">>Willkommen " + NMember.user.username + "<<", {type: "PLAYING"});
    
    
    
    
} catch(err) {
console.error(err)
}
}}, 3000)
});


client.on("guildMemberRemove", (user) => {
    if (user.guild.id != guild){return;}
    client.guilds.get(user.guild.id).
    channels.find(x => x.name === "willkommen").send(new RichEmbed().setDescription(`${user.user.tag} hat gerade ${user.guild.name} verlassen`).setColor("RANDOM").setThumbnail(user.user.displayAvatarURL))

})