module.exports = function(app, passport){
	
	//for the index.
	app.get('/', function(req, res){
		res.render('index.ejs');
	});
	
	//for the login.
	app.get('/login', function(req, res){
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});
	
	app.post('/login', passport.authenticate('local-signin', {
		successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
 		failureFlash : true 				// allow flash messages
	}));
	
	//for the signup.
	app.get('/signup', function(req, res){
		res.render('signup.ejs', {message: req.flash('signupMessage')});
	});
	
	//process the signup form
	//passport.authenticate is the function of the post-method
  app.post('/signup', passport.authenticate('local-signup', {
   	successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
 		failureFlash : true 				// allow flash messages
 	}));

	
	
	
	//for the profile.
	//here we use route middleware to verify this(the isLoggedIn function) 
	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', {
			user: req.user//get the user out of session and pass to template
		});
	});
	
	// =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', { 
  	scope : ['public_profile', 'email']
  }));

	// handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',	passport.authenticate('facebook', {
  	successRedirect : '/profile',
    failureRedirect : '/'
  }));
	
	app.get('/logout', function(req, res){
		//req.logout - provided by the passport.
		req.logout();
		res.redirect('/');
	});
	
	//next is the function of get-profile.
	function isLoggedIn(req, res, next){
	//if the user authenticated in the session, carry on
		if(req.isAuthenticated()){
			return next();
		}
		
		//if they aren't redirect them to home page
		res.redirect('/');
	}
};
