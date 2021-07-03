const express = require('express');
const router = new express.Router();
const formidable = require('formidable');
const csv = require('csv-parser')
const fs = require('fs')
const { PlayerStore } = require('../models/player.js');
const results = [];

function players (req, res) {
    let data = {players: "testing"};
    res.json(data);
}

function fileupload (req, res) {
    let form = formidable({ multiples: true });
    form.parse(req, function (err, fields, files) {
        fs.createReadStream(files.file.path)
        .pipe(csv())
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', async () => {
            console.log(results);
            await PlayerStore.createMany(results);
            res.redirect('/players');
        });
    });
}

router.get('/players', players);
router.post('/fileupload', fileupload);

module.exports = router;