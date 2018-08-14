<?php

use App\Mail\FeedbackReceiver;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Http\Request;

Route::get('/', function(){
	return view('home');
});

Route::get('about', function(){
	return view('about');
});

Route::get('contact', function(){
	return view('contact');
});

Route::post('contact', function(Request $request){

	//here the code of post to contact.
	//If validation fails, the user will automatically be redirected or, in the case of an AJAX request, a JSON response will be returned.
	\Validator::make($request->all(), [
		'name' 		=> 	'required|string',
		'email'		=>	'required|email',
		'comment'	=>	'required|string'
	])->validate();

	Mail::to($request->get('email'))
		->send(new FeedbackReceiver($request->get('name'), $request->get('comment')));

//normal code execution with successful validation.
// send email or do whatever you want here,
// redirect user back and notify him of our success.
	return redirect('contact')->with(['success_message'=>'Your Message has been sent']);
});
