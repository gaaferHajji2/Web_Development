module.exports = function(app){
	console.log('The Routing File: index.server.routes.js');
	var index = require('../controllers/index.server.controller');
	app.get('/', index.render);
};
