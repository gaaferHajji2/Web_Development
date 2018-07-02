var connect=require('connect');
var app=connect();

var logger = function(req,res, next){
	console.log(req.method, req.url);
	
	next();
}

var helloworld=function(req,res,next){
	res.setHeader('Content-Type', 'text/plain');
	res.end('Salam Alekoum');
}

var salamAlekoum=function(req,res,next){
	res.setHeader('Content-Type', 'text/plain');
	res.end('Salam Alekoum, see you again');
}

app.use(logger);
app.use('/hello', helloworld);
app.use('/goodbye', salamAlekoum);
app.listen(3000);

console.log('Server running at http://localhost:3000/');

