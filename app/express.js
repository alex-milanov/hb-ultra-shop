'use strict'
var path = require('path');
var http = require('http');
var fileUtil = require('../util/file');
var passport = require('passport');

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')({
	session: session
});

var flash = require('connect-flash');
//var config = require('./config');

// restify
var restify = require("iblokz-node-restify");
var restMap = require("../data/restMap.json");


module.exports = function(app, db){



	restify.loadModel(restMap, db);

	// config stuff

	app.set('views',__dirname+'/../views');
	app.set('view engine','jade');

	app.use(bodyParser.urlencoded({
		extended: true
	}));
    
	app.use(bodyParser.json());
	app.use(methodOverride());
    
    var seed = 'lumbatumbass';
	app.use(cookieParser(seed));
	
	/*app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: seed,
		store: new mongoStore({
			db: db.connection.db,
			collection: 'sessions'
		}),
		cookie: {
			path: '/',
			httpOnly: true,
			secure: false,
			maxAge: 3600000
		},
		name: 'connect.sid'
	}));*/

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(flash());

	app.use(express.static(__dirname+"/../public"));


	// Bootstrap passport config
	require('./routes')(app);

	// TODO: load additional routes
	restify.initRoutes(app,restMap,{}, db);

	return app;
}