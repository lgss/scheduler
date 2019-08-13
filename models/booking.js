var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Booking = new Schema({
	resource: String,
	start: String,
	end: String,
	updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', Booking);