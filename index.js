const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const port = process.env.PORT || 3000

// Run before other code to make sure variables from .env are available
dotenv.config()

// database
mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// creating an express instance
const app = express()

// middleware
app.use(bodyParser.json())
app.use(cors())

// set up separate routes files for easier management
app.use(express.static('static'))
var resource = require('./routes/resource.js');
app.use('/resource', resource);
var restriction = require('./routes/restriction.js');
app.use('/restriction', restriction);
var availability = require('./routes/availability.js');
app.use('/availability', availability);

// run the server
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})