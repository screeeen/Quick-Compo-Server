const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: String,
  img: String,
  position: Number,
  score: Number,
  tournament: {type:Schema.Types.ObjectId,ref:'Tournament'}
})


const Player = mongoose.model('Player', playerSchema);

module.exports = Player;