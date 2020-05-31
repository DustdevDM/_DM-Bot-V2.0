const {twitch_bot} = require("../twitch")
const {client, config} = require("../index")
var ioClient = require('socket.io-client');

const {livelistner} = require("./livechecker")

const fetch = require("node-fetch")
    var tipee = null

    livelistner.on("live", () => {
    fetch("https://api.tipeeestream.com/v2.0/site/socket").then(res => res.json())
    .then(json => {
        if (json.message != "success") return console.log("[Tipee Stream] ERROR: Cant get Websocket API Path")
        
        console.log(`${json.datas.host}:${json.datas.port}`)
        var baseurl = `${json.datas.host}:${json.datas.port}?access_token=${config.tipee}`
        
        tipee = ioClient(baseurl);
        tipee.connect()
        tipee.on('connect', function(){
            console.log("[Tipeee] Websocket connected")
            tipee.send('join-room', {
                room: config.tipee,
                username: 'dustin-dm'
              })
              livelistner.once("offline", () => {tipee.destroy()})
        });
        tipee.on('new-event', function(data){
            //Donation
            if (data.event.type == "donation"){
                var gebüren = " ."
                if (data.event.parameters.fees == 1){gebüren = " und das übernehmen der Tipee Gebühren!"}
                twitch_bot.say("#dustin_dm" ,`Vielen Dank ${data.event.parameters.username} für die ${data.event["formattedAmount"]}${gebüren} "${data.event.parameters.message}"`)
            }
            //Follow
            if (data.event.type == "follow"){
                twitch_bot.say("#dustin_dm" ,`Willkommen in der _DM Crew @${data.event.parameters.username}`)
            }
            //Host
            if (data.event.type == "hosting"){
                twitch_bot.say("#dustin_dm", `Danke für deinen Host @${data.event.parameters.username}. Wir schulden dir ${data.event.parameters.viewers} Zuschauer`)
            }
            if (data.event.type == "raid"){
                twitch_bot.say("#dustin_dm", `@${data.event.parameters.username} Raidet unseren Stream! Hallo an die ${data.event.parameters.viewers} neuen Zuschauer!`)
            }
        })
      
       
    
    });
})
