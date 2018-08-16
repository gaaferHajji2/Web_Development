module.exports = function(app){
	app.get('/', (req, res)=>{
		res.send('Salam Alekoum, Cookies are: ' + JSON.stringify(req.cookies));
	});

	app.get('/cookie', (req, res)=>{
		//addiotional cookie options can be setting using object, we can set one of them, or group of them.
		res.cookie('Name', 'Test_Test', {expire: new Date() + 9999, maxAge:9999}).send('cookie setted');
	});

	app.get('/clearcookie', function(req, res){
		res.clearCookie('Name');
		res.send('Cookie Deleted');
	});
};
