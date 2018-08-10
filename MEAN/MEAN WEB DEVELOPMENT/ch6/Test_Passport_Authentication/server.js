var express = require('express');
var app = express();
console.log('make express application');;

var port = process.env.PORT || 3000;

var mongoose = require('mongoose');
console.log('require mongoose module');

var passport = require('passport');
var flash = require('connect-flash');
console.log('require the passport and connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser= require('body-parser');
var session = require('express-session');
console.log('Require morgan, cookieParser, bodyParser, and express-session');

var configDB = require('./config/database.js');

//connect to mongodb.
mongoose.connect(configDB.url, {useNewUrlParser:true});

//setup the express application
app.use(morgan('dev'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
console.log('use morgan for dev, cookieParser, and bodyParser');

app.set('view engine', 'ejs');
console.log('Set The View Engine');

app.use(session({secret:'My_Name_is_Gaafer_Hajji', 
		saveUninitialized: true,
		resave: true}));

//first we initialize The passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
console.log('use passport, flash');

require('./app/routes/routes.js')(app, passport);
console.log('require The routes');

app.listen(port);

