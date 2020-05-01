const {client, config} = require('./index.js')
const fs = require("fs")

const TwitchBot = require('twitch-bot')

const Bot = new TwitchBot(config.twitch)
exports.twitch_bot = Bot;


Bot.on('join', channel => {
    console.log(`[Twitch] ${Bot.username} is now connectet to ` + channel)
    Bot.say("Der Chat hat meine volle aufmerksamkeit")

    
      setInterval(() => {
      var randomspruch = [
        [
      "Ihr wollt Dustin unterstützen und seinen ewigen Dank erhalten? Dann gebt Dustin doch einen Euro aus eurer Sofa ritze --> https://www.tipeeestream.com/dustin-dm/donation",
      "Ihr wollt Dustin unterstützen und seinen ewigen Dank erhalten? Dann gebt Dustin doch den Euro den ihr vorhin auf der Straße gefunden habt --> https://www.tipeeestream.com/dustin-dm/donation",
      "Ihr wollt Dustin unterstützen und seinen ewigen Dank erhalten? Dann gebt Dustin euer komplettes Geld... Oder nur einen Euro. Der reicht auch... (fürs erste) --> https://www.tipeeestream.com/dustin-dm/donation",
      "Ihr wollt Dustin unterstützen und seinen ewigen Dank erhalten? Dann gebt Dustin nen Euro damit er sich wieder Fake Follows kaufen kann... Eh was? --> https://www.tipeeestream.com/dustin-dm/donation",
      "Ihr wollt Dustin unterstützen und seinen ewigen Dank erhalten? Dann gebt Dustin doch nen Euro damit er mich nicht wieder heimlich offline nimmt weil ich zu teuer bin :( --> https://www.tipeeestream.com/dustin-dm/donation",
      "Ihr wollt Dustin unterstützen und seinen ewigen Dank erhalten? Dann gebt Dustin doch einpaar Sternis damit er Tom Nooks schulden endlich abbezahlen kann --> https://www.tipeeestream.com/dustin-dm/donation"
    ],
        [
      "Wenn euch der Stream gefällt dann lasst doch nen Follow da um den nächsten Stream nicht zu verpassen!",
      "Wenn euch der Stream gefällt dann lasst doch nen Follow da um Dustin beim nächstem mal wieder Failen zu sehen",
      "Wenn euch der Stream gefällt dann lasst doch nen Follow da um beim nächsten mal wieder zu sehen wie Dustin sich 100 mal verspricht",
      "Wenn euch der Stream gefällt dann lasst doch nen Follow da um Dustin bei seiner Mission zu helfen Coin Master zu werden",
      "Wenn euch der Stream gefällt dann lasst doch nen Follow da um Dustin zu helfen die Welt zu übernehmen",
      "Wenn euch der Stream gefällt dann lasst doch nen Follow da um Dustin zu helfen Gronkhs Kanal zu übernehmen",
      "Wenn euch der Stream gefällt dann lasst doch nen Follow da um Dustin zu helfen ein foRtNiTe PrOfI zu werden"
    ],
        [
          "Joint der _DM Crew auf Discord --> _discord in chat",
         "Du bekommst keine Twitch Benachichtigung für meine Streams? Verpasse nichts mehr auf meinen Discord! --> _discord in chat",
         "Bock mit mir zu schreiben oder mir eine Frage zu stellen? Join meinem Discord! --> _discord in chat"],
         ["Dustin ist auch auf Twitter. Lasst doch beim vorbeigehen nen Follow fallen --> _twitter in chat",
          "Dustin hat auch einen Youtube Channel. Schau mal vorbei --> _youtube",
          "Dustin leitet aktuell einen Nintendo Discord Server. Wenn ihr bock auf wöchentliche Turnier wie z.B jeden Montag Mario Kart und mehr habt dann schaut mal vorbei! --> https://discord.gg/P2kKEd9"]
        ]
    
    let spruchC = randomspruch[Math.floor(Math.random() * randomspruch.length)];
    let spruch = spruchC[Math.floor(Math.random() * spruchC.length)];
      Bot.say(spruch)
    }, 600000
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

    console.log("Ciowertjweiotwej")
    if (!client.twitchcommands.has(alias)) return;
    if (chatter.message.startsWith(prefix) == false) return;


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
  // if cache
  if (viewercache.find(v => chatter.user_id === v)) return;
  //if db
  var vdb = await viewerdb.find({"twitch": chatter.user_id})
  if (vdb.length > 0) return viewercache.push(`${chatter.user_id}`)
  // create
  viewercache.push(`${chatter.user_id}`)
   await new viewerdb({twitch: `${chatter.user_id}`}).save().then(
    Bot.say("Willkommen @" + chatter.display_name)
  )

  })
  
