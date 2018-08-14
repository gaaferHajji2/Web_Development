@extends('layouts.default')

@section('title')

@section('content')

@if (count($errors) > 0)
	<div class="alert alert-danger">
  	<ul>
    	@foreach ($errors->all() as $error)
      	<li>{{ $error }}</li>
      @endforeach
   	</ul>
	</div>
@endif

@if (session('success_message'))
	<div class="alert alert-success">
  		{{ session('success_message') }}
	</div>
@endif

<form method="POST" action="{{ url('/contact') }}">
     {{ csrf_field() }}
     <div class="form-group">
         <label for="name">Name</label>
         <input id="name" type="text" class="form-control" name="name" value="{{ old('name') }}" placeholder="Your name">
     </div>
     <div class="form-group">
         <label for="email">E-mail</label>
         <input id="email" type="email" class="form-control" name="email" value=" {{ old('email') }}" placeholder="Your E-mail">
     </div>
     <div class="form-group">
         <label for="comment">Message</label>
         <textarea rows="10" id="comment" class="form-control" name="comment" placeholder="Your message">{{ old('comment') }}</textarea>
     </div>
     <button type="submit" class="btn btn-primary btn-lg">Send</button>
 </form>

@stop
