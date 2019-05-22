const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
  name:String,
  img:String,
  players: [{type: Schema.Types.ObjectId,ref:'Player'}],
  games:[{type: Schema.Types.ObjectId,ref:'Game'}]
})

const Tournament = mongoose.model('Tournament',tournamentSchema);

module.exports = Tournament;

