exports.render = function(req, res){
	//for debugging pupose
	console.log(req.method, req.url)
	res.send('Salam Alekoum');
};