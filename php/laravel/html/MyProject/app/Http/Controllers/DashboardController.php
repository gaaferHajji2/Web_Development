<?php
/*
Often it’s clearer and more direct to attach middleware to your routes in the controller instead of at the route definition. You can
do this by calling the middleware() method in the constructor of your controller. The string you pass to the middleware() method is
the name of the middleware, and you can optionally chain modifier methods ( only() and except() ) to define which methods will receive that 
middleware:
*/

class DashboardController extends Controller{
	public function __construct(){
		$this->middleware('auth');
		$this->middleware('admin-auth')->only('admin');
		$this->middleware('team-member')->except('admin');
	}
}
?>
