var app 	= require('express')();
var mongoose	= require('mongoose');
var Book	= require('../models/Book.js');

//get all Books
app.get('/', function(req, res, next){
	Book.find(function(err, products){
		if(err) return next(err);
		
		res.json(products);
	});
});

//get single book by id
app.get('/:id', function(req, res, next){
	Book.findById(req.params.id, function(err, post){
		if(err) return next(err);
		
		res.json(post);
	});
});

//Save Book
app.post('/', function(req, res, next){
	Book.create(req.body, function(err, post){
		if(err) return next(err);
		
		res.json(post);
	});
});

//Update Book
app.put('/:id', function(req, res, next){
	Book.findByIdAndUpdate(req.params.id, req.body, function(err, post){
		if(err) return next(err);
		
		res.json(post);
	});
});

//Delete Book
app.delete('/:id', function(req, res, next){
	Book.findByIdAndRemove(req.params.id, req.body, function(err, post){
		if(err) return next(err);
		
		res.json(post);
	});
});

module.exports = app;
