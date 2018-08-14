<!-- Here we test The Subviews -->
<nav class="navbar navbar-inverse">
   <div class="container">
     <div class="navbar-header">
         <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" 
		aria-controls="navbar">
         <span class="sr-only">Toggle navigation</span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
       </button>
       <a class="navbar-brand" href="{{ url('/') }}">Elementary Laravel</a>
     </div>
     <div id="navbar" class="navbar-collapse collapse">
     	<ul class="nav navbar-nav navbar-right">
         	<li><a href="{{ url('/') }}">Home</a></li>
					<li><a href="{{ url('/about') }}">About</a></li>
     	  	<li><a href="{{ url('/contact') }}">Contact</a></li>
     	</ul>
     </div><!--/.navbar-collapse -->
   </div>
</nav>
