const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const gameSchema = new Schema({
  player1: [{type: Schema.Types.ObjectId,ref:'Player'}],
  player2: [{type: Schema.Types.ObjectId,ref:'Player'}],
  winner: String,
  img :String
})

const Game = mongoose.model('Game',gameSchema);

module.exports = Game;