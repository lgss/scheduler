const express = require('express');
const mongoose = require('mongoose');

var router = express.Router();

var Availability = require('../models/availability');
mongoose.Promise = global.Promise;

// C: create a availability
router.post('/create', (req, res) => {
    var newAvailability = new Availability({
        resource: req.body.availabilityResource,
        start: req.body.availabilityStart,
        end: req.body.availabilityEnd,
    })
    newAvailability.save()
        .then((callback) => {
            res.send(callback)
            console.log(callback)
        })
        .catch(console.error)
})

// R: get all availabilities
router.get('/get', async (req, res) => {
    Availability.find()
        .then((results) => {
            res.send(results)
            console.log(results)
        })
        .catch(console.error)
})

// R: get a availability
router.post('/get', async (req, res) => {
    var query = { _id: req.body.availabilityID }
    Availability.findOne(query)
        .then((results) => {
            res.send(results)
            console.log(results)
        })
        .catch(console.error)
})

// U: update a availability
router.post('/update', (req, res) => {
    var query = { _id: req.body.availabilityID }
    var update = { resource: req.body.availabilityResource, start: req.body.availabilityStart, end: req.body.availabilityEnd }
    Availability.findOneAndUpdate(query,update)
        .then((callback) => {
            res.send(callback)
            console.log(callback)
        })
        .catch(console.error)
})

// D: Delete a availability
router.post('/delete', (req, res) => {
    var query = { _id: req.body.availabilityID }
    Availability.findOneAndDelete(query)
        .then((callback) => {
            res.send(callback)
            console.log(callback)
        })
        .catch(console.error)
})

module.exports = router;