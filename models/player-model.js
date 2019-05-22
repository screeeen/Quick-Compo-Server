const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: String,
  img: String,
  position: Number,
  score: [],
  tournament: {type:Schema.Types.ObjectId,ref:'Tournament'}
})


const Player = mongoose.model('player', playerSchema);

module.exports = Player;