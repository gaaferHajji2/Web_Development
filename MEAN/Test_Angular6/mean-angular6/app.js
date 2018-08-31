var createError = require('http-errors');
var express     = require('express');
var path	= require('path');
var favicon	= require('serve-favicon');
var logger	= require('morgan');
var bodyParser	= require('body-parser');
var methodOverride = require('method-override');

var apiRouter	= require('./routes/book');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride());

app.use(express.static(path.join(__dirname,'dist/mean-angular6')));
app.use('/', express.static(path.join(__dirname+'dist/mean-angular6')));//this is middleware
app.use('/api', apiRouter);//this is middleware for api


//when no thing found make 404 error
app.use(function(req, res, next){
	next(createError(404));
});

//error handler
app.use(function(err, req, res, next){
	console.log('on Error Handler of app.js using express');
	console.log('The Error is: ' + err);
	console.log('The Message is: ' + err.message);
	//set locals, only providing error in development
	res.locals.message 	= err.message;
	res.locals.error		= req.app.get('env') === 'development' ? err : {};
	
	//render the error page
	res.status(err.status || 500);
	res.send(err.status);
});

//make the connection to mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mean-angular6', {useNewUrlParser:true, promiseLibrary:require('bluebird')}).then(()=>{
	console.log('connection successful');
}).catch((err) => console.error(err));

module.exports = app;
