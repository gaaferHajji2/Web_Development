const webpush = require('web-push');
const express = require('express');
const app	  = express();
const morgan  = require('morgan');
const bodyParser = require('body-parser');
const config  = require('./config.js');

const publicVapidKey = config.publicVapidKey;
const privateVapidKey = config.privateVapidKey;

//----------------------------
webpush.setVapidDetails('mailto:gaafer.hajji1995@gmail.com', publicVapidKey, privateVapidKey);
//----------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./routes.js')(app, webpush);

//to serve the static content
app.use(express.static('./'));

app.use(morgan('dev'));

app.listen(3000, ()=>{
	console.log('Application run of localhost:3000');
});
