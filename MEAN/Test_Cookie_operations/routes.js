module.exports = function(app){
	app.get('/', (req, res)=>{
		res.send('Salam Alekoum, Cookies are: ' + JSON.stringify(req.cookies));
	});

	app.get('/cookie', (req, res)=>{
		res.cookie('Name', 'Gaafer Hajji').send('cookie setted');
	});
};
