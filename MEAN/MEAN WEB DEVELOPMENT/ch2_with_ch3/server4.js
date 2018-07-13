var app = require('express')();

app.get('/name', function(req, res){
	console.log(req.method, req.url);
	res.end('Data Here');
});

app.use('/', function(req, res){
	res.send('Salam Alekoum');
});

app.listen(3000);
console.log('Server Running at http://localhost:3000/');
module.exports=app;
