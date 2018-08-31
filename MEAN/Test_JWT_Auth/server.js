var app = require('./app.js');

var server = app.listen(3000, function(){
	console.log('Express Server listening on port ' + 3000);
});
