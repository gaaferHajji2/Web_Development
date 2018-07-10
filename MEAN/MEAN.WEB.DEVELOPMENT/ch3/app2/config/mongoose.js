var config=require('./config');
var mongoose = require('mongoose');

module.exports = function(){
	var db = mongoose.connect(config.db, {useNewUrlParser:true});
	console.log('Connection to MongoDB Correctly');
	require('../app/models/user.server.model');
	return db;
};
