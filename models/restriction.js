var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Restriction = new Schema({
	resource: String,
	start: Date,
	end: Date,
	frequency: String,
	interval: Number,
	duration: Number,
	updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Restriction', Restriction);