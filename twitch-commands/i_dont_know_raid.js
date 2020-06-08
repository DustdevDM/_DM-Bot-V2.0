module.exports = {
	name: 'idkraid',
	description: 'Ein Command um dem Streamer bei der Auswahl eines Raid Partners zu helfen',
    usage: `idkraid` ,
	execute (channel, userstate, message, self, args, TwitchBot) {

        const fetch = require("node-fetch")
        const config = require('../config.json')
        
        //Dont execute command if executer isnt dustin
    if ("179697954" == userstate["user-id"]){
        //Request Twitch Barer Token
        fetch(`https://id.twitch.tv/oauth2/token?client_id=${config.twitch.api.clientID}&client_secret=${config.twitch.api.token}&grant_type=client_credentials`, { method: 'POST'}).then(res => res.json())
.then(async json => {

   var barer = json.access_token



        var raidbarepersonen = {follower: null, samegame: null}
        TwitchBot.say(channel, `${userstate["display-name"]} bitte warte einen Moment`)
        //Fetch Streams from Follower
        await fetch(`https://api.twitch.tv/helix/users/follows?from_id=${userstate["user-id"]}&first=100`, {headers: {"Client-ID": config.twitch.api.clientID, "Authorization": `Bearer ${barer}`}}).then(res => res.json())
        .then(async jsonfollowing => {
            console.log(jsonfollowing)
            await fetch(`https://api.twitch.tv/helix/streams?${jsonfollowing.data.map(x => "user_id=" + x.to_id).join("&")}`, {headers: {"Client-ID": config.twitch.api.clientID, "Authorization": `Bearer ${barer}`}}).then(res => res.json())
            .then(async jsonfollowerstreams => {
              if (jsonfollowerstreams.data.length != 0){
              await fetch("https://api.twitch.tv/helix/games?id=" + jsonfollowerstreams.data[0].game_id, {headers: { 'Client-ID': config.twitch.api.clientID, "Authorization": `Bearer ${barer}`}}).then(res => res.json()).then(game => {
                raidbarepersonen.follower = {streamer: jsonfollowerstreams.data[0].user_name, game: game.data[0].name}})}
            })
        })
      //Fetch Streams with same Game and same Language
      await fetch(`https://api.twitch.tv/helix/streams?user_id=${userstate["user-id"]}`, {headers: {"Client-ID": config.twitch.api.clientID, "Authorization": `Bearer ${barer}`}}).then(res => res.json())
        .then(async jsonownstream => {
          if(jsonownstream.data.length == 0){}
          else {
          await fetch("https://api.twitch.tv/helix/games?id=" + jsonownstream.data[0].game_id, {headers: { 'Client-ID': config.twitch.api.clientID, "Authorization": `Bearer ${barer}`}}).then(res => res.json()).then(async game => {
            if (game.data.length == 0){}
            else {
             await fetch(`https://api.twitch.tv/helix/streams?language=de&game_id=${game.data[0].id}&first=1`, {headers: {"Client-ID":config.twitch.api.clientID, "Authorization": `Bearer ${barer}`}}).then(res => res.json())
              .then(randomstream => {
                if (randomstream.data.length != 0){raidbarepersonen.samegame = {streamer: randomstream.data[0].user_name, game: game.data[0].name}}
              })
            }
          
        })}
          })

          //Analyse results and send into chat
          var post_text = []
          
          if (raidbarepersonen.follower != null){
            post_text.push(`❤️ > ${raidbarepersonen.follower.streamer} > ${await raidbarepersonen.follower.game} < ❤️`)
          }
          if (raidbarepersonen.samegame != null){
            post_text.push(`🔶 > ${raidbarepersonen.samegame.streamer} > ${raidbarepersonen.samegame.game} < 🔶`)
          }
          setTimeout(() => {
            if (post_text.length == 0){
              TwitchBot.say(channel, "Sorry. Aber ich konnte niemanden zum raiden finden")
            }
            else {
              post_text.forEach(x => {
                TwitchBot.say(channel, post_text.join(""))

              })
            }
          }, 1500)
        })
    }
        else {
            TwitchBot.say(channel, `${userstate["display-name"]} du kannst diesen Command nicht ausführen` )
        }
    

    
			
	},
};