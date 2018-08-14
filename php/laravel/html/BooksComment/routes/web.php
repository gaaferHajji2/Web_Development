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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/forms', function(){
	return view('forms');
})

/*
Route::get('books/{book_slug}/posts/{post_slug}/comments/{comment_id}', 'BookPostCommentController@show');
*/
