const {twitch_bot} = require("../twitch")
const {client, config} = require("../index")
const schedule = require("node-schedule")
const {livelistner} = require("./livechecker")
const VIEWER = require("../Models/VIEWER")

const fetch = require("node-fetch")


livelistner.on("live", () => {
    var chatchecker = schedule.scheduleJob("*/5 * * * *", async function(){
    fetch("https://tmi.twitch.tv/group/user/dustin_dm/chatters").then(res => res.json()).then(json => {
    
    json.chatters.moderators.forEach(async v => {
        var vidb = await VIEWER.findOne({"twitchnick": v})
        if (vidb){
    
          await VIEWER.findOneAndUpdate({"twitch": vidb.twitch}, {"watchtime": vidb.watchtime + 5})
        }
    });
    
    json.chatters.vips.forEach(async v => {
        var vidb = await VIEWER.findOne({"twitchnick": v})
        if (vidb){
    
            await VIEWER.findOneAndUpdate({"twitch": vidb.twitch}, {"watchtime": vidb.watchtime + 5})
        }
    });
    
    json.chatters.viewers.forEach(async v => {
        var vidb = await VIEWER.findOne({"twitchnick": v})
        if (vidb){
    
            await VIEWER.findOneAndUpdate({"twitch": vidb.twitch}, {"watchtime": vidb.watchtime + 5})
        }
    });
    
    json.chatters.broadcaster.forEach(async v => {
        var vidb = await VIEWER.findOne({"twitchnick": v})
        if (vidb){
    
            await VIEWER.findOneAndUpdate({"twitch": vidb.twitch}, {"watchtime": vidb.watchtime + 5})
        }
    });
    
    })
    })
    
    livelistner.once("offline", () => {
        chatchecker.cancel()
    })
})    

module.exports = WatchTimeProcessor
