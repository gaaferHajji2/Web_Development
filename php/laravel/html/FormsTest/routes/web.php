<?php

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
/*
Route::get('/', function () {
	return view('welcome');
});
*/
//Define resource for the UserController.
Route::resource('users', 'UsersController');

Route::get('/forms', function(){
	return view('forms');
});

//we use as-keyword to use the route name instead of the url.
Route::get('/', ['as' => 'home', function(){
	return view('forms');
}]);

