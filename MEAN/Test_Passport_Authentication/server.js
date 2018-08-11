var express = require('express');
var app = express();
//console.log('make express application');;

var port = process.env.PORT || 3000;

var mongoose = require('mongoose');
//console.log('require mongoose module');

var passport = require('passport');

var flash = require('connect-flash');

//console.log('require the passport and connect-flash');

var morgan = require('morgan');

var cookieParser = require('cookie-parser');

var bodyParser= require('body-parser');

var session = require('express-session');

//console.log('Require morgan, cookieParser, bodyParser, and express-session');

var configDB = require('./config/database.js');

//connect to mongodb.
mongoose.connect(configDB.url, {useNewUrlParser:true});

require('./config/passport')(passport);

//setup the express application

//1--> setup morgan for debugging.
app.use(morgan('dev'));

//2--> setup the cookie-parser.
app.use(cookieParser());

//3--> setup the body-parser.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//console.log('use morgan for dev, cookieParser, and bodyParser');

//4--> set the view engine as ejs.
app.set('view engine', 'ejs');
//console.log('Set The View Engine');

//5--> set up express-session
app.use(session({secret:'My_Name_is_Gaafer_Hajji', 
		saveUninitialized: true,
		resave: true}));

//6--> set up the passport.
//first we initialize The passport
app.use(passport.initialize());
app.use(passport.session());

//7--> setup the connect-flash for messaging.
app.use(flash());

//console.log('use passport, flash');

require('./app/routes/routes.js')(app, passport);
//console.log('require The routes');

app.listen(port);
console.log('server runnning on localhost:'+port);
