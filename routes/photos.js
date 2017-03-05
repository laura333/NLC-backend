'use strict';

const express = require('express');
const knex = require('../knex');
const router = express.Router();

// YOUR CODE HERE
router.get('/', (req, res, next) => {
    knex('photos')
        .select('id', 'image')
        .then((rows) => {
            res.send(rows);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:id', (req, res, next) => {
    var id = Number.parseInt(req.params.id);
    if (Number.isNaN(id)) {
        return next();
    }
    knex('photos')
        .select('id', 'image')
        .where('id', id)
        .then((row) => {
            res.send(row[0]);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
