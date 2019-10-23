const express = require('express');
const mongoose = require('mongoose');
var moment = require('moment');
var router = express.Router();

var Restriction = require('../models/restriction');
mongoose.Promise = global.Promise;

// R: get availability by date
router.post('/getbydate', async (req, res) => {
    console.log("Create slots")
    x = createSlots(req.body.start, req.body.end, req.body.interval)
    console.log("Get restrictions")
    getRestrictionsByDate(req.body.start, req.body.end, function(y) {
        console.log("Get available slots")
        z = calculateAvailableSlots(x,y)
        res.send(z)
    })
})

function createSlots(start, end, interval) {
                    //TODO: Create a list for slots to be held in
                    var slotList = []
                    var availabilityEnd = moment(end).format()
                    var slotStart = moment(start).format()
                    var slotEnd= moment(slotStart).add(interval, 'm').format()
                    var slot = 0
                    while (slotEnd <= availabilityEnd) {
                        console.log("Slot: " + slot + " Start: " + slotStart + " End:" + slotEnd)
                        var slotStr = {"slot":slot, "start":slotStart, "end": slotEnd} //Create slots as json objects
                        slotList.push(slotStr) //Add slots to the list
                        slotStart = slotEnd
                        slotEnd = moment(slotEnd).add(interval, 'm').format()
                        slot+=1
                    } 
                    return slotList // Return the list of slots
}

function getRestrictionsByDate(start,end, callback) {
    var query = {start: {'$lt': end }, end: {'$gt': start }}
    Restriction.find(query)
        .then((results) => {
            results.forEach(result => {
                console.log("Restriction: Start: " + moment(result["start"]).format() + " > End: " + moment(result["end"]).format())                
            });
            callback(results)
        })
        .catch(console.error)
}

function calculateAvailableSlots(slots,restrictions) {
    var availableSlots = []

    slots.filter(slot => {
        for (var i = 0; i < restrictions.length; i++) {  
            rStart = moment(restrictions[i]["start"]).format()
            rEnd = moment(restrictions[i]["end"]).format()
            var add = true;

            if (
                (slot["start"] >= rStart && slot["start"] < rEnd) ||
                (slot["end"] > rStart && slot["end"] <= rEnd) ||
                (slot["start"] <= rStart && slot["end"] >= rEnd)
                ) {
                    return add = false
                }
            else
                continue
        }
        if(add)
            console.log("Slot: " + " Start: " + slot["start"] + " > End:" + slot["end"])
            availableSlots.push(slot)
        return true;
    });
    return availableSlots
}

module.exports = router;