var User = require('mongoose').model('User');
var passport = require('passport');
//it is private function
var getErrorMessage = function(err){
	var message = '';
	
	if(err.code){
		switch(err.code){
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = "Something went wrong";
		}
	}else{
		for(var errName in err.errors){
			if(err.errors[errName].message)
				message = err.errors[errName].message;
		}
	}
	
	return message;
};

exports.renderSignin = function(req, res, next){
	if(!req.user){
		res.render('signin', {
			title: 'Sign-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	}else{
		res.redirect('/')
	}
};

exports.renderSignup = function(req, res, next){
	if(!req.user){
		res.render('signup', {
			title:'Sign-up Form',
			message: req.flash('error')
		});
	}else{
		return res.redirect('/');
	}
};

exports.signup = function(req, res, next){
	if(!req.user){
		var user = new User(req.body);
		var message = null;
		
		user.provider = 'local';
		user.save(function(err){
			if(err){
				//The getErrorMessage() method is a private method that returns a unified error message from a Mongoose error object. It is worth noticing that there are two possible errors here: a MongoDB indexing error handled using the error code and a Mongoose validation error handled using the err.errors object.
				var message = getErrorMessage(err);
				
				req.flash('error', message);
				return res.redirect('/signup');
			}
			//The signup() method uses your User model to create new users. As you can see, it first creates a user object from the HTTP request body. Then, try saving it to MongoDB. If an error occurs, the signup() method will use the getErrorMessage()-method to provide the user with an appropriate error message. If the user creation was successful, the user session will be created using the req.login() method. The req.login() method is exposed by the Passport module and is used to establish a successful login session. After the login operation is completed, a user object will be signed to the req.user object.
			
			//The req.login() will be called automatically while using the passport.authenticate() method, so a manual call for req.login() is primarily used when registering new users.
			req.login(user, function(err){
				if(err) return next(err);
				
				return res.redirect('/');
			});
		});
	}else{
		return res.redirect('/');
	}
};

exports.signout=function(req, res){
	req.logout();
	res.redirect('/');
};

exports.create = function(req, res, next){
	var user = new User(req.body);
	user.save(function(err){
		if(err){
			return next(err);
		}else{
			res.json(user);
		}
	});
};

exports.list = function(req, res, next){
	User.find({}, function(err, users){
		if(err){
			return next(err);
		}else{
			res.json(users);
		}
	});
};

exports.list2 = function(req, res, next){
	//here we want to retrieve only username, email.
	User.find({}, 'username email', function(err, users){
		if(err){
			return next(err);
		}else{
			res.json(users);
		}
	});
}

exports.list3 = function(req, res, next){
	//here we limit and skip only the data that we want
	//This will return a subset of up to 10 user documents while skipping the first 10 documents.
	User. find({}, 'username email', {skip:10, limit:10}, function(err, users){
	if(err){
		return next(err);
	}else{
		res.json(users);
	}
	});
};

exports.read = function(req, res){
	res.json(req.user);
}

//You will use the userById() method as a middleware to deal with the manipulation of single documents when performing read, delete, and update operations.
exports.userByID = function(req, res, next, id){
	User.findOne({ _id:id }, function(err, user){
		if(err){
			return next(err);
		}else{
			//here we set the request for the update method.
			req.user = user;
			//then we call read or update.
			next();
		}
	});
}

//here we want to update the values of user using findByIdAndUpdate()
exports.update=function(req, res, next){
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
		if(err){
			return next(err);
		}else{
			res.json(user);
		}
	});
};

//here we want to delete user by id.
exports.delete=function(req, res, next){
	//if we set User.remove(function(err){...})-- this will remove all thing.
	req.user.remove(function(err){
		if(err){
			return next(err);
		}else{
			res.json(req.user);
		}
	});
};
