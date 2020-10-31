process.env.TZ = 'Europe/Berlin'
const config = require("./config.json");
const colour = require("./colours.json")
const fs      = require("fs");

const Discord = require("discord.js");
const { RichEmbed } = require('discord.js')

const client = new Discord.Client();
const bot = client;


exports.client = client;
exports.config = config;
client.commands = new Discord.Collection();
client.twitchcommands = new Discord.Collection();


//Database connection
const mongoose = require("mongoose")
mongoose.connect(config.db,{ useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("Database connection active!")
    mongoose.set('useFindAndModify', false);
})

client.on("ready", () => {

    client.user.setActivity("Sorry", {type: "PLAYING"});
console.log(`\x1b[32m${bot.user.username}\x1b[33m is now online\x1b[37m`)
setInterval(function(){
    
let statuses = [
   // `Codet by ${client.users.get("330380702505762817").tag}`,
    "Botversion: " + config.version,
    "Bot Ping: " + Math.round(client.ping),
    `Need some Help? ${config.prefix}help`,
    `Written with Discord.js v.${Discord.version} in Javascript`,
    `Check my health: status.dustin-dm.de`
]

let status = statuses[Math.floor(Math.random() * statuses.length)];
client.user.setActivity(status, {type: "PLAYING"});
    

}, 30000)
}); //Game

//Command Parser
const commandFiles = fs.readdirSync('./dc-commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./dc-commands/${file}`);

    client.commands.set(command.name, command);
    console.log("Found an command => " + command.name)
}
client.on("message", (message) => {

    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let alias = messageArray[0].replace(prefix, "");
    let args = messageArray.slice(1);
    
    if (!client.commands.has(alias)) return;

    try {
        client.commands.get(alias).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Ein Fehler ist beim ausführen des Commands aufgetreten');
    }

})

require("./react-to-older-messages")
require("./events/welcome")


//twitch
require("./twitch")

bot.login(config.token)