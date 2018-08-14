<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BookPostCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param book_slug
     * @param post_slug
     * @param comment_id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($book_slug, $post_slug, $comment_id)
    {
        //First we Find The Book by slug
	$book = \App\Book::where('slug', $book_slug)->firstOrFail();

	//then we find the post from that book:
	$post = $book->posts()->where('slug', $post_slug)->firstOrFail();

	//Finally, we find the comment by comment id from that post
	$comment = $post->comments()->findOrFail($comment_id);

	return view('books.comments.show')->with(compact('book', 'post', 'comment'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
