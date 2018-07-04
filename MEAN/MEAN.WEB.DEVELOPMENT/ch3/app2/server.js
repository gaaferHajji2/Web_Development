process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log('The NODE_ENV is: ', process.env.NODE_ENV);

var express = require('./config/express');
var app = express();
app.listen(3000);
module.exports = app;
