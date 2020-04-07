const {client, config} = require('./index.js')
const fs = require("fs")

const TwitchBot = require('twitch-bot')

const Bot = new TwitchBot({
  username: 'dustin_dm_bot',
  oauth: 'oauth:epdjp8pbpyoyf5et0hbgj5locz3623',
  channels: ['Dustin_DM']
})
exports.twitch_bot = Bot;


Bot.on('join', channel => {
    console.log(`[Twitch] ${Bot.username} is now connectet to ` + channel)
    Bot.say("Der Chat hat meine volle aufmerksamkeit")
  })

  Bot.on('part', channel => {
    console.log(`[Twitch] ${Bot.username} is no longer connectet to ` + channel)
  })

  Bot.on('error', err => {
    console.log(err)
  })

  //Command Parser
const commandFiles = fs.readdirSync('./twitch-commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./twitch-commands/${file}`);

    client.twitchcommands.set(command.name, command);
    console.log("[Twitch] Found an command => " + command.name)
}

Bot.on('message', chatter => {
    let prefix = config.prefix;
    let messageArray = chatter.message.split(" ")
    let alias = messageArray[0].replace(prefix, "");
    let args = messageArray.slice(1);

    if (!client.twitchcommands.has(alias)) return;

    try {
        client.twitchcommands.get(alias).execute(chatter, args, Bot);
    } catch (error) {
        console.error(error);
        Bot.say("@" + chatter.display_name + ' Ein Fehler ist beim ausführen des Commands aufgetreten');
    }

  })

  var viewercache = []
  var viewerdb = require("./Models/VIEWER")
  Bot.on("message", async chatter => {
    console.log(viewercache)
    // if cache
  if (viewercache.find(v => chatter.user_id === v)) return;
  //if db
  var vdb = await viewerdb.find({"twitch": chatter.user_id})
  console.log(vdb)
  if (vdb.length > 0) return viewercache.push(`${chatter.user_id}`)
  // create
  viewercache.push(`${chatter.user_id}`)
   await new viewerdb({twitch: `${chatter.user_id}`}).save().then(
    Bot.say("Willkommen @" + chatter.display_name)
  )

  })
  