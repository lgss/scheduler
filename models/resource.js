var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Resource = new Schema({
	name: String,
	updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', Resource);