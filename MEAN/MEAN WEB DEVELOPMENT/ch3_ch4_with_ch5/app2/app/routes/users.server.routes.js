var users = require('../../app/controllers/users.server.controller');

module.exports = function(app){
	//using restful principle to create new user.
	app.route('/users').post(users.create).get(users.list);
	//using the next list for username, email
	app.route('/users/email/username').get(users.list2).get(users.list3);
	//to test skip, limit
	app.route('/users/email/username2').get(users.list3);
	
	//to read the data by id
	//these two methods will call users.userById then call them using next()-method of userById
	app.route('/users/:userId').
	get(users.read).
	put(users.update).
	delete(users.delete);
	
	/*
	use the app.param() method that defines a middleware to be executed before any other middleware that uses that parameter. Here, the 					 users.userById() method will be executed before any other middleware registered with the userId parameter, which in this case is the 				users.read() middleware. This design pattern is useful when building a RESTful API, where you often add request parameters to the routing string.
	*/
	app.param('userId', users.userByID);
}
