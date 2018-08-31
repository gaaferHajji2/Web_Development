<?php
ob_start();
$myusername = "admin";
$mypassword = "1ns3cur3";
$myemail = "admin@server.com";
$username = $_POST['username'];
$password = $_POST['password'];
if($username == $myusername && $password == $mypassword)
{
	echo "Sucessfully logged into the system.";
	setcookie("usercred", $username . ":" . $myemail, time()+60*30);
	echo '<FORM METHOD="LINK" ACTION="InsecureCookieAuth.php">';
	echo '<INPUT TYPE="submit" VALUE="Admin Panel">';
	echo '</FORM>';
}
else
{
	echo "Error: Login credentials not valid.";
}
?>
