/*
 * Finally, you need to implement the worker.js file that client.js loads. This is where your service worker logic lives. In a service worker,  you  get a 'push' event when your subscription receives a push notification.

*/

console.log('Loaded Service Worker!');

self.addEventListener('push', ev=>{
	const data = ev.data.json();
	
	console.log('Got Push', data);
	
	self.registration.showNotification(data.title, {
		body: 'Salam Alekoum',
		icon: 'http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png'
	});
	
	console.log('show Notification finished OK!!');
});
