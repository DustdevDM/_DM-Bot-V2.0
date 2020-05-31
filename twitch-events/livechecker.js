const EventEmitter = require('events');
var livelistner = new EventEmitter();
exports.livelistner = livelistner;

const {config} = require("../index")
const fetch = require("node-fetch")
var schedule = require('node-schedule');


//request barer Token
var barer = ""
var saved_request = null
requestBarerToken()
function requestBarerToken(){
fetch(`https://id.twitch.tv/oauth2/token?client_id=${config.twitch.api.clientID}&client_secret=${config.twitch.api.token}&grant_type=client_credentials`, { method: 'POST'}).then(res => res.json())
.then(json => {
    setTimeout(() => {
        requestBarerToken()
    }, json.expires_in)
    barer = json.access_token
})
}
//179697954
setTimeout(() => { var checkforonline = schedule.scheduleJob("*/3 * * * *", function(){
    
fetch("https://api.twitch.tv/helix/streams?user_id=179697954", {headers: {"Client-ID": config.twitch.api.clientID, "Authorization": `Bearer ${barer}`}}).then(res => res.json())
.then(json => {
    //Dustin is not Streaming
    if (json.data.length == 0){
        if (saved_request == null || saved_request.data.length == 0){
            //Dustin is and was not Streaming
        }
        else if (saved_request.data.length != 0){
            //Dustin just endet a Stream
            livelistner.emit("offline")
        }
    }
    //Dustin is Streaming
    else if (json.data.length != 0) {
        if (saved_request.data[0].id == json.data[0].id ){
            //Dustin is STILL Live
        }
        else if (saved_request == null){
            //Bot crashed while Dustin was and is live
            livelistner.emit("live")
        }
        else if (saved_request.data[0].id != json.data[0].id){
            //Dustin is now Live with a new Livestream
            livelistner.emit("live")
        }
    }

    saved_request = json
})

})}, 10000);







