const {config, twitch_bot} = require("../index")
const {livelistner} = require("./livechecker")
const fetch = require("node-fetch")
const nanoid = require("nanoid")


//create webserver
const express = require('express')
const bodyParser = require('body-parser');
const { default: Axios } = require("axios")

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var session_token = nanoid.nanoid(10)

function unsubscribeall() {
  fetch(`https://id.twitch.tv/oauth2/token?client_id=${config.twitch.api.clientID}&client_secret=${config.twitch.api.token}&grant_type=client_credentials`, { method: 'POST'}).then(res => res.json())
.then(json => {
   
    var barer = json.access_token

  Axios.get("https://api.twitch.tv/helix/webhooks/subscriptions", 
{
    headers: {
      "Authorization": "Bearer " + barer,
      "Client-ID": config.twitch.api.clientID
    }}).then(function (response) {

      response.data.data.forEach(s => {
        Axios.post("https://api.twitch.tv/helix/webhooks/hub", 
  {"hub.callback": s.callback, 
  "hub.mode": "unsubscribe", 
  "hub.topic": s.topic
  }, {
    headers: {
      "Authorization": "Bearer " + json.access_token,
      "Client-ID": config.twitch.api.clientID
    }})
      console.log(`[Twitch Webhook] Send unsubscribe request for ${s.topic}`)
      })
    })  .catch(function (error) {
      console.log(error);
    });

  })
  
}

app.use(`/supscription/${session_token}/:event`, (req, res) => {
  console.log("-------Twich_SUP_SYSTEM-------")
    if (req.method == "GET"){
        console.log(req.query)
        res.send(req.query["hub.challenge"])
    }
    else if (req.method == "POST"){
        res.sendStatus(200)
        console.log(req.params.event, req.body)
    }
})

livelistner.on("live", () => {

    var server = app.listen(6787, () => {

  fetch(`https://id.twitch.tv/oauth2/token?client_id=${config.twitch.api.clientID}&client_secret=${config.twitch.api.token}&grant_type=client_credentials`, { method: 'POST'}).then(res => res.json())
.then(json => {
   
    var barer = json.access_token


  console.log("[Twitch Webhook] Webserver is running on port 6787")

  //Subscribe to Dustins Stream changes
  Axios.post("https://api.twitch.tv/helix/webhooks/hub", 
  {"hub.callback": `http://server.dustin-dm.de:6787/supscription/${session_token}/Stream-Changed`, 
  "hub.mode": "subscribe", 
  "hub.topic": `https://api.twitch.tv/helix/streams?user_id=${config.twitch.userids[0]}`,
  "hub.lease_seconds": 900
  }, {
    headers: {
      "Authorization": "Bearer " + barer,
      "Client-ID": config.twitch.api.clientID
    }}).then(function (response) {
    })  .catch(function (error) {
      console.log(error);
    });


     livelistner.once("offline", () => {
      unsubscribeall()
      setTimeout(() => {
        server.close()
      }, 10000);
 })

})
})

})