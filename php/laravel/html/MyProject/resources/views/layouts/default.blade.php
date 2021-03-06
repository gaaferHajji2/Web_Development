<!DOCTYPE html>
<html lang="en">
	<head>
     		<meta charset="utf-8">
      		<meta http-equiv="X-UA-Compatible" content="IE=edge">
      		<meta name="viewport" content="width=device-width, initial-scale=1">
     		 <title>@yield('title', 'Elementary Laravel')</title>
     		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
		integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<style>
         		body {
             			padding-bottom: 20px;
         		}

		.navbar {
 	            margin-bottom: 0px;
         	    border-radius: 0;
        	 }
    		 </style>

   	</head>
   	<body>
   	@include('layouts.partials.navbar')
		@yield('content')
	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->

     	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min. js"></script>
     	<!-- Latest compiled and minified JavaScript -->
     	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" 
	integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	</body>
</html>
