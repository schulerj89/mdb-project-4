const express = require('express');
const router = new express.Router();
const { PlayerStore } = require('../models/player.js');

function home (req, res) {
  res.render('home');
}

async function players (req, res) {
  let players = await PlayerStore.readAll();
  res.render('players', {
    players: players
  });
}

router.get('/', home);
router.get('/players', players);

module.exports = router;