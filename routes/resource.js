const express = require('express');
const mongoose = require('mongoose');

var router = express.Router();

var Resource = require('../models/resource');
mongoose.Promise = global.Promise;

// C: create a resouce
router.post('/create', (req, res) => {
    var newResource = new Resource({
        name: req.body.resourceName
    })
    newResource.save()
        .then((callback) => {
            res.send(callback)
            console.log(callback)
        })
        .catch(console.error)
})

// R: get all resources
router.get('/get', async (req, res) => {
    Resource.find()
        .then((results) => {
            res.send(results)
            console.log(results)
        })
        .catch(console.error)
})

// R: get a resource
router.post('/get', async (req, res) => {
    var query = { _id: req.body.resourceID }
    Resource.findOne(query)
        .then((results) => {
            res.send(results)
            console.log(results)
        })
        .catch(console.error)
})

// U: update a resource
router.post('/update', (req, res) => {
    var query = { _id: req.body.resourceID }
    var update = { name: req.body.updateResourceName }
    Resource.findOneAndUpdate(query,update)
        .then((callback) => {
            res.send(callback)
            console.log(callback)
        })
        .catch(console.error)
})

// D: delete a resource
router.post('/delete', (req, res) => {
    var query = { _id: req.body.resourceID }
    Resource.findOneAndDelete(query)
        .then((callback) => {
            res.send(callback)
            console.log(callback)
        })
        .catch(console.error)
})

module.exports = router;