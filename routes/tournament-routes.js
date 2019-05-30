var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const parser = require('./../config/cloudinary');



const Tournament = require('../models/tournament-model')
const Player = require('../models/player-model')

/* GET home page. */
router.get('/tournaments', function (req, res, next) {
  Tournament.find().populate('players').populate('games')
    .then((allTournaments) => {
      res
        .json(allTournaments)
    })
    .catch((err) => {
      res
        .status(500)
        .json(err)
    })
});

/* GET '/tournaments/:id. => pick one tournament*/
router.get('/tournaments/:id', function (req, res, next) {
  const { id } = req.params;
  console.log(id);
  Tournament.findById(id).populate('player', 'game')
    .then((foundTournament) => {
      res
        .status(200)
        .json(foundTournament)
    })
    .catch((err) => {
      res
        .status(500)
        .json(err)
    })
});


// PUT '/tournaments/:id' 		=> to update a specific Tournament
router.put('/tournaments/edit/:id', (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  console.log('hola',req.params.id, req.body);
  
  Tournament.findByIdAndUpdate(req.params.id, req.body)
    .then(() => { 
      res
      .json({ message: `Tournament with ${req.params.id} is updated successfully.` })
    })
    .catch(err => {
      res.json(err);
    })
})



// POST '/tournaments/add-tournament'		 => to create a tournament
router.post('/tournaments/add-tournament', (req, res) => {
  const { name, img, players, games } = req.body;

  // console.log(req.file.secure_url);
  // const img = req.file.secure_url;
  // console.log('image', img);
  console.log('image', img);

  Tournament.create({
    name,
    img,
    players,
    games
  })
    .then((response) => {
      res
        .status(201)
        .json(response)
    })
    .catch((err) => {
      res
        .status(500)
        .json(err)
    })
})


// POST '/tournaments/upload-image'		 => to create a tournament
router.post('/tournaments/upload-image', parser.single('photo'), (req, res, next) => {
  console.log('file upload');
  if (!req.file) {
    next(new Error('No file uploaded!'));
  };
  const imageUrl = req.file.secure_url;
  console.log("imageUrl -->  " + imageUrl);
  res.json(imageUrl).status(200);
});


// DELETE '/tournaments/add-tournament'		 => to create a tournament
router.delete('/tournaments/delete/:id', (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Tournament.findByIdAndRemove(id)
    .then(() => {
      res
        .status(202)
        .json({ message: `Tournament with ${id} was removed` });
    })
    .catch((err) => {
      res
        .status(500)
    })
})



module.exports = router;