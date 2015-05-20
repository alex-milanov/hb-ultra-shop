"use strict"

// require the dependencies
var express = require('express');
var mongoose = require('mongoose');


// declare the app
var app = express();

// connect to db
var db = mongoose.connect("mongodb://localhost/ultra-shop");

// Init the express application
require('./app/express')(app, db);

// Bootstrap passport config
require('./app/routes')(app);

// Bootstrap passport config
require('./app/passport')();

// launch the server
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

})