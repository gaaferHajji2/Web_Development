exports.render = function(req, res){
	//record the time of the last user request
	if(req.session.lastVisit){
		console.log(req.session.lastVisit);
	}
	//set The new Date
	req.session.lastVisit = new Date();

	//for debugging pupose
	console.log(req.method, req.url);
	//res.send('Salam Alekoum');
	res.render('index', {
		title:'Salam Alekoum', 
		userFullName: req.user ? req.user.fullName: ''
	});
};
