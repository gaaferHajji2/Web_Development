var User = require('mongoose').model('User');

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
