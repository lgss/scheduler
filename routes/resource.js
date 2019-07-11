const express = require('express');
const mongoose = require('mongoose');

var router = express.Router();

var Resource = require('../models/resource');
mongoose.Promise = global.Promise;

// get a resource
router.get('/', (req, res) => {
    Resource.find(function (err, results) {
        if (err) return console.error(err)
        res.send(Resources)
	})
})

// create a resouce
router.post('/', (req, res) => {
    var newResource = new Resource({
        name: req.body.text
    })
    newResource.save(function (err, newResource) {
        if (err) return console.error(err);
        res.status(201).send()
    })
})

module.exports = router;