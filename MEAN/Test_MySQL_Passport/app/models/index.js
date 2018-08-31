"use strict";
 
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
//this will treated as JS-Object and env is the key.
var config = require(path.join(__dirname, '../..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};
 
 
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        console.log('--------------ForEach---------------');
				console.log('The Model Name is: ' + model.name);
				console.log('The Model is: ' + model);
				console.log('------------------------------------');
        db[model.name] = model;
    });
 
Object.keys(db).forEach(function(modelName) {
		console.log('inside Object.keys of index.js, modelName is: ' + modelName);
    if ("associate" in db[modelName]) {
    		console.log('associate in db`[${modelName}]`');
        db[modelName].associate(db);
    }
    console.log('-------------------------------------------');
});
 
 
db.sequelize = sequelize;
db.Sequelize = Sequelize;
 
module.exports = db;
