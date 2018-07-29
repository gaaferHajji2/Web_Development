var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function(){
	//register the strategy using passport.use
	//The LocalStrategy takes The function as callback.
	passport.use(new LocalStrategy(function(username, password, done){
		User.findOne({
			username: username
		}, function(err, user){
		
			if(err){
				return done(err);
			}
			
			if(!user){
				return done(null, false, {
					message : 'unknown user'
				});
			}
			
			return done(null, user);
		});
	}));
}
