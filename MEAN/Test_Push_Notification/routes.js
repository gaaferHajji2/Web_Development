module.exports = (app, webpush)=>{
	//post to subscribe
	app.post('/subscribe', (req, res)=>{
		const subscription = req.body;
		res.status(201).json({});
		const payload			 = JSON.stringify({ title:'test' });
		
		console.log(subscription);
		
		webpush.sendNotification(subscription, payload).catch(error => {
			console.error(error.stack);
		});
	});
	
	
};
