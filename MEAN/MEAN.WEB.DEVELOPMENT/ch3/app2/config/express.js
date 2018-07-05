var config  = require('./config');
var express = require('express');
var morgan  = require('morgan');
var compress= require('compression');
var bodyParser= require('body-parser');
var methodOverride= require('method-override');
var session = require('express-session');

module.exports = function(){
	var app = express();

	if(process.env.NODE_ENV === 'development'){
		app.use(morgan('dev'))
	}else if(process.env.NODE_ENV === 'production'){
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({extended: true}));

	app.use(bodyParser.json());

	app.use(methodOverride());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	require('../app/routes/index.server.routes.js')(app);
	/*
Notice how the express.static() middleware is placed below the call for the routing file. This order matters because if it were above it,
Express would first try to look for HTTP request paths in the static files folder. This would make the response a lot slower as it would have
to wait for a filesystem I/O operation.
	*/
	//set the user public folder
	app.use(express.static('./public'))

	return app;
};
