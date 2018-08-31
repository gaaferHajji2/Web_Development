var authController = require('../controllers/authcontrollers.js');

module.exports = function(app){
	app.get('/signup', authController.signup);

	app.get('/signin', authController.signin);
}
