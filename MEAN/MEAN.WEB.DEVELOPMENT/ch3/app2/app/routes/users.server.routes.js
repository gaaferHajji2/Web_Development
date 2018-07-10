var users = require('../../app/controllers/users.server.controller');

module.exports = function(app){
	//using restful principle to create new user.
	app.route('/users').post(users.create).get(users.list);
}
