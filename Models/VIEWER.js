const mongoose = require("mongoose")

const Schema = mongoose.Schema({
   discord: {type: String, default: null},
   twitch: {type: String, default: null},
   twitchnick: {type: String, default: null},

   rank: {rank: {type: Number, default: 0}, xp: {type: Number, default: 0}},
   watchtime: {type: Number, default: 0}
})

module.exports = mongoose.model("Viewer", Schema)