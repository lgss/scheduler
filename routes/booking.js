const express = require('express');
const mongoose = require('mongoose');

var router = express.Router();

var Booking = require('../models/booking');
mongoose.Promise = global.Promise;

// C: create a booking
router.post('/create', (req, res) => {
    var newBooking = new Booking({
        resource: req.body.bookingResource,
        start: req.body.bookingStart,
        end: req.body.bookingEnd,
    })
    newBooking.save()
        .then((callback) => {
            res.send(callback)
            console.log(callback)
        })
        .catch(console.error)
})

// R: get all bookings
router.get('/get', async (req, res) => {
    Booking.find()
        .then((results) => {
            res.send(results)
            console.log(results)
        })
        .catch(console.error)
})

// R: get a booking
router.post('/get', async (req, res) => {
    var query = { _id: req.body.bookingID }
    Booking.findOne(query)
        .then((results) => {
            res.send(results)
            console.log(results)
        })
        .catch(console.error)
})

// U: update a booking
router.post('/update', (req, res) => {
    var query = { _id: req.body.bookingID }
    var update = { resource: req.body.bookingResource, start: req.body.bookingStart, end: req.body.bookingEnd }
    Booking.findOneAndUpdate(query,update)
        .then((callback) => {
            res.send(callback)
            console.log(callback)
        })
        .catch(console.error)
})

// D: Delete a booking
router.post('/delete', (req, res) => {
    var query = { _id: req.body.bookingID }
    Booking.findOneAndDelete(query)
        .then((callback) => {
            res.send(callback)
            console.log(callback)
        })
        .catch(console.error)
})

module.exports = router;