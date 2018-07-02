var connect=require('connect');
var app=connect();

var helloworld=function(req, res, next){
	res.setHeader('Content-Type', 'text/plain');
	res.end('Salam Alekoum');
};

var logger=function(req, res, next){
	console.log(req.method, req.url);
	
	next();

}

app.use(logger);
app.use(helloworld);
app.listen(3000);
console.log('Server running at http://localhost:3000/');
