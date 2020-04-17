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

    setInterval(() => {
      let followsprüche = [
        "den nächsten Stream nicht zu verpassen!",
        "Dustin beim nächstem mal wieder Failen zu sehen",
        "beim nächsten mal wieder zu sehen wie Dustin sich 100 mal verspricht",
        "Dustin bei seiner Mission zu helfen Coin Master zu werden",
        "Dustin zu helfen die Welt zu übernehmen",
        "Dustin zu helfen Gronkhs Kanal zu übernehmen",
        "Dustin zu helfen ein foRtNiTe PrOfI zu werden"
      ]
      
      let followspruch = followsprüche[Math.floor(Math.random() * followsprüche.length)];
      Bot.say("Wenn euch der Stream gefällt dann lasst doch nen Follow da um " + followspruch)
    }, 900000
    );

    setInterval(() => {
      let spendensprüche = [
      "Dann gebt Dustin doch einen Euro aus eurer Sofa ritze",
      "Dann gebt Dustin doch den Euro den ihr vorhin auf der Straße gefunden habt",
      "Dann gebt Dustin euer komplettes Geld... Oder nur einen Euro. Der reicht auch... (fürs erste)",
      "Dann gebt Dustin nen Euro damit er sich wieder Fake Follows kaufen kann... Eh was?",
      "Dann gebt Dustin doch nen Euro damit er mich nicht wieder heimlich offline nimmt weil ich zu teuer bin :( "
    ]
    
    let spendenspruch = spendensprüche[Math.floor(Math.random() * spendensprüche.length)];
      Bot.say("Ihr wollt Dustin unterstützen und seinen ewigen Dank erhalten? " + spendenspruch + " --> https://www.tipeeestream.com/dustin-dm/donation")
    }, 2700000
    );
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
    if (chatter.message.startsWith(prefix) == false || chatter.message.startsWith("!") == false ) return;


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
  