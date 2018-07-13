'use strict'

var express = require('express');
var app = express();

app.use('/', function(req, res){
	//use the response object to send a response
	res.send('Salam Alekoum');
});
app.listen(3000);

console.log("http://Server running at http://3000/");

//expose our express application instance for external usage
module.exports = app;
