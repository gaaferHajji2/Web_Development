process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log('The NODE_ENV is: ', process.env.NODE_ENV);
//this must be the first to use, becasue we want any module can use the User-module.
var mongoose = require('./config/mongoose');
var express = require('./config/express');


var db= mongoose();
var app = express();
app.listen(3000);
module.exports = app;
console.log('Server Running at http://localhost:3000/');
