//This file will be responsible for telling the browser to initialize your service worker and making the HTTP request to /subscribe.
//var config = require('./config.js');
const publicVapidKey = 'BEsnBty-vMpQVGh4YusSgJRXvp9KRelVpUGD5HgFJ4yF_HeHpOwfg13JesJ1svGHNZU9KCr4YYZBzwO_GI0XINc';

if('serviceWorker' in navigator){
	console.log('Registering service worker');
	
	run().catch((error)=>{
		console.log('error in run-method, in catch method of run method');
		
		console.log(error);
	});
}else{
	console.log('serviceWorker not in navigator');
}
//-----------------------------------------Run Method-------------------------
async function run(){
	console.log('Registering service worker');
	
	const registeration = await navigator.serviceWorker.register('./worker.js', {scope:'/'});
	
	console.log('Registered service worker');
	
	console.log('Registering push');
	
	const subscription = await registeration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
	});
	
	console.log('Registered Push');
	
	console.log('Sending Push');
	
	await fetch('/subscribe', {
		method: 'POST',
		body: JSON.stringify(subscription),
		headers: {
			'content-type':'application/json'
		}
	});
	
	console.log('Sent Push');
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

