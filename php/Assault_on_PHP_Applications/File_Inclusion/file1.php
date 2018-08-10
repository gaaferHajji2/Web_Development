<?php
//examples of file inclusion.

//the $mod can be changed from the attacker and set attack vector. (modify all the data, get all database information, ...etc).
if (isset($mod)){

	/*
	register_globals = on will need to be set (php.ini) for this to be exploitable, as $mod is not set with any data from sent over HTTP, so a 			variable will need to be set with a request for exploitation. As register_globals has been removed from PHP as of version 6.0.0. this will 			no longer be code vulnerable to exploitation.
	*/
	include ("include/modules/$mod.php");
} elseif ($art){
	//do something here.
}
?>

<?php
//here we must first santize the input of $_GET, then check it, then check the roles, then use it.
if(file_exists('site/'.$_GET['action'].'.php'))
{
	include('site/'.$_GET['action'].'.php');
} else {
	//some code here.
	// Include language file
	if(isset($_GET['lang']))
		$lang = $_GET['lang'];
	else
		$lang = 'en';

	include("langs/$lang.php");
	// Define function for the history
	include("langs/history_$lang.php");
}
?>

<?php
//smae thing for: sanitize, check, role, use
if (!$formname && $_GET["editform"])
	$formname = $_GET["editform"];

if ( $error_message || $error || !$_POST["submitval"] )
{
	include_once ($formname."-header.inc.php");
	include_once ($addeditcwd."addedit-create-form.php");
	include_once ($formname."-footer.inc.php");
}
?>
