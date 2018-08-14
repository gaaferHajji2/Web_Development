module.exports = function(app, passport){

		app.get('/', function(req, res){
			res.render('index.ejs');
		});
	  // facebook -------------------------------
        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
				
        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));
            
            
	// locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { 
          scope : ['public_profile', 'email'] 
        }));
        
        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
        	passport.authorize('facebook', {
          	successRedirect : '/profile',
            	failureRedirect : '/'
        }));
        
	// google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));
            
  app.get('/profile', isLoggedIn, function(req, res){
  	res.render('profile2.ejs', {
  		user:req.user
  	});
  })
   
	function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
	}

};
