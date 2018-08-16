var express = require('express');
var app = express();
var stylus  = require('stylus');
var nib	    = require('nib');
var morgan  = require('morgan');

//var util = require('./util.js');

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

//app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}));
//this is used for client side of: css, js, images not with views.
app.use(express.static(__dirname+'/public'));

app.set('views', './public/views');

app.get('/', function(req, res){
	res.render('index', {title: 'Home'});
});

app.listen(3000);
