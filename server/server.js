var express = require('express')
var app = express()
var bodyParser = require('body-parser');
// const cors = require('express-cors');
var mongoose=require('mongoose');
var fs = require('fs')
const path = require('path');
var User = require('./models/user.js')
var City = require('./models/city.js')
const MongoClient = require('mongodb').MongoClient

var dbName = 'studentDB';
var connectionString = 'mongodb://localhost:27017/' + dbName;
mongoose.connect(connectionString);

// mongoose.connect(process.env.MONGOLAB_URI, function (error) {
//     if (error) console.error(error);
//     else console.log('mongo connected');
// });

// app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// app.use('/api')

// Get all users
app.get('/users', (request, response) => {
  User.find(function(err, users) {
  if (err) {
    response.send(err)
  }
  response.send({ users: users });
  })
});

// Get all cities
app.get('/cities', (request, response) => {
  City.find(function(err, cities) {
  if (err) {
    response.send(err)
  }
  response.send({ cities: cities });
  })
});

app.post('/users', function(req, res) {
  var user = new User(req.body);

  user.save(function(err) {
    if (err) {
      res.send(err)
    }
    User.find(function(err, users) {
      res.send('success!')
    })
  })
})

app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

var port_number = process.env.PORT || 3001

app.listen(port_number, function () {
  console.log('RrrarrrrRrrrr server alive on port 3001')
})
