//      routes/game-routes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Player = require('../models/player-model');
const Tournament = require('../models/tournament-model');
const Game = require('../models/game-model');


const robin = require('roundrobin');


/* GET home page. */
router.get('/games', function (req, res, next) {

  Game.find().populate('player1').populate('player2')
    .then((allGames) => {
      res
        .json(allGames)
    })
    .catch((err) => {
      res
        .status(500)
        .json(err)
    })
});

/* GET '/games/:id. => pick one tournament*/
router.get('/games/:id', function (req, res, next) {
  const { id } = req.params;

  Game.findById(id).populate('player')
    .then((foundGame) => {
      res
        .status(200)
        .json(foundGame)
    })
    .catch((err) => {
      res
        .status(500)
        .json(err)
    })
});



// POST '/games/add-game'		 => to create a tournament
router.post('/games/add-game', (req, res) => {
  const { player1, player2, img, winner, tournamentId } = req.body;
  console.log(img, player1, player2, winner, tournamentId, 'joer');

  Game.create({
    player1,
    player2,
    winner,
    img,
  })
    .then((newGame) => {
      Tournament.findByIdAndUpdate(tournamentId, { $push: { games: newGame._id } }, { new: true })
        .then((aResponse) => {
          res
            .status(201)
            .json(aResponse);
        })
        .catch((err) => {
          res
            .status(500)
            .json(err)
        })
    })
})

// POST '/games/add-all-games'		 => to create a tournament
router.post('/games/add-all-games', (req, res) => {
  const { tournamentId , players } = req.body; // warning: players faked below thru robin

  //check if players.lenght is pow 2

  let rounds = robin(players.length, [...players] );
  let games = [];
  rounds.forEach((round, i) => {
    games.push(...round);
  })

  let gamePromises = games.map((game) => {

    return Game.create({
      player1: game[0], //player 1
      player2: game[1], //player 2
      winner: -1 // result not played yet
    })
  })

  Promise.all(gamePromises)
    .then((createdGamesIntoTheDatabase) => {
      console.log(createdGamesIntoTheDatabase);

      const arrayOfIds = createdGamesIntoTheDatabase.map((oneGame) => {
        return oneGame._id;
      })

      Tournament.findByIdAndUpdate(tournamentId, { $set: { games: arrayOfIds } }, { new: true })
        .then((updatedTournamentInDB) => {
          res
            .status(201)
            .json(updatedTournamentInDB)
        })
        .catch((err) => {
          res
            .status(500)
            .json(err)
        })
        .catch((err) => {
          res
            .status(500)
            .json(err)
        })
    })
})





// PUT '/games/edit/:id' 		=> to update a specific project
router.put('/games/edit/:id', (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Game.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Game with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})





module.exports = router; 