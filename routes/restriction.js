const express = require('express');
const mongoose = require('mongoose');

var router = express.Router();

var Restriction = require('../models/restriction');
mongoose.Promise = global.Promise;

// C: create a restriction
router.post('/create', (req, res) => {
    var newRestriction = new Restriction({
        resource: req.body.restrictionResource,
        type: req.body.restrictionType,
        start: req.body.restrictionStart,
        end: req.body.restrictionEnd,
    })
    newRestriction.save()
        .then((callback) => {
            res.send(callback)
            console.log(callback)
        })
        .catch(console.error)
})

// R: get all restrictions
router.get('/get', async (req, res) => {
    Restriction.find()
        .then((results) => {
            res.send(results)
            console.log(results)
        })
        .catch(console.error)
})

// R: get a restriction
router.post('/get', async (req, res) => {
    var query = { _id: req.body.restrictionID }
    Restriction.findOne(query)
        .then((results) => {
            res.send(results)
            console.log(results)
        })
        .catch(console.error)
})

// U: update a restriction
router.post('/update', (req, res) => {
    var query = { _id: req.body.restrictionID }
    var update = { resource: req.body.restrictionResource, type: req.body.restrictionType, start: req.body.restrictionStart, end: req.body.restrictionEnd }
    Restriction.findOneAndUpdate(query,update)
        .then((callback) => {
            res.send(callback)
            console.log(callback)
        })
        .catch(console.error)
})

// D: Delete a restriction
router.post('/delete', (req, res) => {
    var query = { _id: req.body.restrictionID }
    Restriction.findOneAndDelete(query)
        .then((callback) => {
            res.send(callback)
            console.log(callback)
        })
        .catch(console.error)
})

module.exports = router;