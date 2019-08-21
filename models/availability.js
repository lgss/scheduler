var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Availability = new Schema({
	resource: String,
	start: Date,
	end: Date,
	updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Availability', Availability);