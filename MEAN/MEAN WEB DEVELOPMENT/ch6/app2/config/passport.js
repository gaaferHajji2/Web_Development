var passport = require('passport');
var mongoose = require('mongoose');

module.exports=function(){
	//used to applu mongoose function(save, delete, update, select)
	var User = mongoose.model('User');
	
	
	//define how will handle user serialization
	passport.serializeUser(function(user, done){
		console.log('User in serializeUser is: ', user);
		
		//when the user is saved, passport will save id to session.
		done(null, user.id);
	});
	
	//to make sure Mongoose doesn't fetch the user's password and salt properties.
	//Later passport will use id-property to grap the user.
	passport.deserializeUser(function(id, done){
		User.findOne({_id:id}, 
					'-password -salt', 
					function(err, user){
			
			done(err, user);
		
		});
	
	});

	require('./strategies/local.js')();
};
