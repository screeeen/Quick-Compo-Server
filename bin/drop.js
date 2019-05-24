const mongoose = require('mongoose');
const Tournament = require('../models/tournament-model');
const player1 = require('../models/player-model');
const Game = require('../models/game-model');

const dbName = 'project-server';
mongoose.connect(`mongodb://localhost/${dbName}`);

Tournament.collection.drop();
Game.collection.drop();
// Player.collection.drop();

// mongoose.connection.collections['collectionName'].drop( function(err) {
//   console.log('collection dropped');
// });

mongoose.connection.close();