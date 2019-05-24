const mongoose = require('mongoose');
const Tournament = require('../models/tournament-model');
const player1 = require('../models/player-model');
const Game = require('../models/game-model');

const dbName = 'project-server';
mongoose.connect(`mongodb://localhost/${dbName}`);

Tournament.collection.drop();
Game.collection.drop();
player1.collection.drop();


tournaments = [
  {
    'name': 'pinpon',
    'img': '',
    'players': [],
    'games': []
  },
  {
    'name': 'pachanga',
    'img': '',
    'players': [],
    'games': []
  }
]

players
 = [
  {
    'name': 'julian',
    'img': '',
    'position': 0,
    'score': 0,
    "tournamentId":"5ce709b8791b754a2f0c845c"

  },
  {
    'name': 'pablo',
    'img': '',
    'position': 0,
    'score': 0,
    "tournamentId":"5ce709b8791b754a2f0c845c"

  },
  {
    'name': 'pepe',
    'img': '',
    'position': 0,
    'score': 0,
    "tournamentId":"5ce709b8791b754a2f0c845c"

  },
  {
    'name': 'manolo',
    'img': '',
    'position': 0,
    'score': 0,
    "tournamentId":"5ce709b8791b754a2f0c845c"

  }
]


// games = [
//   {
//     'player1': player1.find({name:'julian'}),
//     'player2': player1.find({name:'pablo'}),
//     'winner': '',
//     'location': 'Marsella',
//     'weather': '',
//     'img': ''
//   },
//   {
//     'player1': player1.find({name:'pepe'}),
//     'player2': player1.find({name:'manolo'}),
//     'winner': '',
//     'location': 'Paris',
//     'weather': '',
//     'img': ''
//   }
// ]



Tournament.create(tournaments, (err) => {
  if (err) { throw (err) }
  console.log(`Created ${tournaments.length} tournaments`)
  mongoose.connection.close();
});

// Game.create(games, (err) => {
//   if (err) { throw (err) }
//   console.log(`Created ${games.length} games`)
//   mongoose.connection.close();
// });

player1.create(players
  , (err) => {
  if (err) { throw (err) }
  console.log(`Created ${players
    .length} players
  `)
  mongoose.connection.close();
});