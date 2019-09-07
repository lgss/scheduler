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
        z = getAvailableSlots(x,y)
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
                        //Create slots as json objects
                        var slotStr = {"slot":slot, "start":slotStart, "end": slotEnd}
                        //Add slots to the list
                        slotList.push(slotStr)
                        slotStart = slotEnd //should slot end be 1 min later than slot end?
                        slotEnd = moment(slotEnd).add(interval, 'm').format()
                        slot+=1
                    }
                    // Return the list of slots
                    return slotList
}

function getRestrictionsByDate(start,end, callback) {
    var query = {start: {'$gte': start }, end: {'$lte': end }} // TODO: This query need work to include overlapping restrictions
    Restriction.find(query)
        .then((results) => {
            results.forEach(result => {
                console.log("Restriction: Start: " + moment(result["start"]).format() + " > End: " + moment(result["end"]).format())                
            });
            callback(results)
        })
        .catch(console.error)
}

function getAvailableSlots(slots,restrictions) {
    //filter
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