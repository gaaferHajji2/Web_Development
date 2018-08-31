var app = require('express')();
var session = require('express-session');
var bodyParser = require('body-parser');
var passport   = require('passport');
var flush			 = require('connect-flash');
var morgan		 = require('morgan');
var env 			 = require('dotenv').load();
var models		 = require('./app/models');
var exphbs		 = require('express-handlebars');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use(flush());
app.use(session({secret:'ILoveGaafer', resave: true, saveUninitialized: true}));

/*-------------------SET VIEW ENGINE PROPERTY-----------------------*/
var exphbs = require('express-handlebars');
app.set('views', './app/views');
app.engine('hbs', exphbs({
	extname: '.hbs'
}));
app.set('view engine', '.hbs');
/*-----------------------------------------------------------------*/
console.log('App Started Parse');

app.get('/', function(req, res){
	res.send('Salam Alekoum to Passport with Sequelize');
});

var authRoute = require('./app/routes/auth.js')(app);

app.listen(5000, function(err){
	if(!err){
		console.log('Site is Live on: http://localhost:' + 5000);
	}else{
		console.log('Error is:' + err );
	}
	
});

models .sequelize.sync().then(function(){
	console.log('Nice! Database looks fine');
}).catch(function(err){
	console.log(err, 'Something went wrong with Database Update');
});
