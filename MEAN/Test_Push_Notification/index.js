const var webpush = require('web-push');
const var express = require('express');
const var app	  = express();
const var morgan  = require('morgan');
const var bodyParser = require('body-parser');
const var config  = require('./config.js');

const var publicVapidKey = config.publicVapidKey;
const var privateVapidKey = config.privateVapidKey;

//----------------------------
weppush.setVapidDetails('mailto:gaafer.hajji1995@gmail.com', publicVapidKey, privateVapidKey);
//----------------------------
