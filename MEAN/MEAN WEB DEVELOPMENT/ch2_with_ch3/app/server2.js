'use strict'
var express = require('express');
var app = express();

var hasName = function(req, res, next){
	console.log('The params are with json: ' + JSON.stringify(req.params));
	console.log('The params are without json: ' + req.params);
	console.log('The Array object is: ' + Array.isArray(req.params));
	console.log('The Keys of the object: ' + Object.keys(req.params));
	console.log('Null object? is: ' + null === req.params);
	if(req.param('name')){
		next();
	}else{
		res.send('What is you name?');
	}
};

var sayHello = function(req, res, next){
	res.send('Hello ' + req.param('name'));
}

app.get('/', hasName, sayHello);

app.listen(3000);

console.log('Server running at http://localhost:3000/');

//expose our express application instance for external usage
module.exports = app;
