//load all things that we need
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
//load up the user model.
var User = require('../app/models/user');

//load The Auth Variables.
var configAuth = require('./auth');

//expose this function to our app using module.exports
module.exports = function(passport){
	// =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function(user, done){
		console.log('---------------------------');
		console.log('Inside Serialize of User, before the done function');
		console.log('---------------------------');
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done){
		console.log('---------------------------');
		console.log('Inside deserialize of User');
		console.log('---------------------------');
		User.findById(id, function(err, user){
			console.log('---------------------------');
			console.log('Inside deserialize of User, of findById user, before the done-function');
			console.log('---------------------------');
			done(err, user);
		});
	});
	
	// =========================================================================
 	// LOCAL SIGNUP ============================================================
 	// =========================================================================
  	// we are using named strategies since we have one for login and one for signup
  	// by default, if there was no name, it would just be called 'local'
	passport.use('local-signup', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with email
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true//allows us to pass back the entire request to the callback
	},
	function(req, email, password, done){
		// asynchronous
   	// User.findOne wont fire unless data is sent back
		process.nextTick(function(){
			/*if(!req.user){*/
				// find a user whose email is the same as the forms email.
		   // we are checking to see if the user trying to login already exists.
		   User.findOne({'local.email': email}, function(err, user){
		   	//if there are any errors, return the error
		   	if(err){
		   		return done(err);
		   	}
		   	
		   	//check to see if theres already a user with that email
		   	if(user){
		   		
		   		return done(null, false, req.flash('signupMessage', 'That email is already taken'));
		   	}else{
		   		//if there is no user with that email
		   		//create the user
		   		var newUser = new User();
		   		
		   		//set the user's local credentials
		   		newUser.local.email = email;
		   		newUser.local.password = newUser.generateHash(password);
		   		
		   		//save the user
		   		newUser.save(function(err){
		   			if(err){
		   				throw err;
		   			}
		   			return done(null, newUser);
		   		});
		   	}
		   });
		  /*}else{
		  	console.log('User informatio is from request in local-sign-up: ' + req.user);
		  	return done(null, req.user);
		  }*/
		});
	}));
	
	// =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'
	passport.use('local-signin', new LocalStrategy({
	// by default, local strategy uses username and password, we will override with email
		usernameField:'email',
		passwordField: 'password',
		passReqToCallback: true // allows us to pass back the entire request to the callback
	}, function(req, email, password, done){
		User.findOne({'local.email': email}, function(err, user){
			if(err){
				return done(err);
			}
			
			if(!user){
				return done(null, false, req.flash('loginMessage', 'No user found'));
			}
			
			if(!user.validPassword(password)){
				return done(null, false, req.flash('loginMessage', 'Oops! Wrong password for the user'));
			}
			
			return done(null, user);
		});
	}));
	// =========================================================================
  // FACEBOOK ================================================================
  // =========================================================================
	passport.use(new FacebookStrategy({
		// pull in our app id and secret from our auth.js file
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
		callbackURL: configAuth.facebookAuth.callbackURL,
		profileFields: configAuth.facebookAuth.profileFields,
		passReqToCallback:true// allows us to pass in the req from our route (lets us check if a user is logged in or not)
		/*
		Profile: The callback will pass back user profile information and each service (Facebook, Twitter, and Google)
			 will pass it back a different way. Passport standardizes the information that comes back in its profile object.
		*/
	}, function(req, token, refreshToken, profile, done){
		//asynchronous
		process.nextTick(function(){
			if(!req.user){
				console.log('--------------------------------');
				console.log('user found in Facebook Authorize');
				console.log('--------------------------------');
				User.findOne({'facebook.id' : profile.id}, function(err, user){
					if(err){
						return done(err);
					}
				
					if(user){
						return done(null, user);
					}else{
						var newUser = new User();
					
						//set all of the facebook information in our user model
						newUser.facebook.id = profile.id;
						newUser.facebook.token = token;
						newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
						console.log('The keys of the profile are: ' + Object.keys(profile));
						console.log('The json of the profile is:  ' + JSON.stringify(profile._json));
						console.log('The email of the user is: ' + profile.emails);
						if(profile.emails !== undefined){
							newUser.facebook.email = profile.emails[0].value;//facebook can return multiple emails so we'll take the first
						}else{
							newUser.facebook.email="No One Found";
						}
						newUser.save(function(err){
							if(err)
								throw err;
							
								return done(null, newUser);
						});
					}
				});
			}else{
				console.log('--------------------------------');
				console.log('user found in Facebook Authorize');
				console.log('--------------------------------');
				// user already exists and is logged in, we have to link accounts
				var user = req.user;//// pull the user out of the session
				
				//update the current users facebook credentials
        user.facebook.id    = profile.id;
        user.facebook.token = token;
        user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
        if(profile.emails !== undefined) {
      		user.facebook.email = profile.emails[0].value;
      	}else{
      		user.facebook.email = "No One Found";
      	}
      	
      	//save the user
      	user.save(function(err){
      		if(err)
      			throw err;
      		
      		return done(null, user);
      	});
			}
		});
	}));
	
	 // =========================================================================
   // GOOGLE ==================================================================
   // =========================================================================
   passport.use(new GoogleStrategy({
   	clientID: configAuth.googleAuth.clientID,
   	clientSecret: configAuth.googleAuth.clientSecret,
   	callbackURL: configAuth.googleAuth.callbackURL
   }, function(token, refreshToken, profile, done){
   	//User.findOne won't fire until we have all our data back from google.
   	process.nextTick(function(){
   		User.findOne({'google.id':profile.id}, function(err, user){
   			if(err){
   				return done(err);
   			}
   			
   			if(user){
   				//if the user is foudn, log them in
   				return done(null, user);
   			}else{
   				//if the user isn't found, create new user
   				var newUser = new User();
   				
   				newUser.google.id = profile.id;
   				newUser.google.token = token;
   				newUser.google.name = profile.displayName;
   				newUser.google.email = profile.emails[0].value;
   				
   				newUser.save(function(err){
   					if(err)
   						throw err
   					
   					return done(null, newUser);
   				});
   			}
   		});
   	});
   }));
};
