<?php
header("Location: InsecureCookieAuth.php");
if (isset($_COOKIE['usercred']))
{
	$authcred = split(":", $_COOKIE['usercred']);
	$username = $authcred[0];
	$useremail = $authcred[1];
	if ($username == "admin" && $useremail == "admin@server.com")
	{
		echo "Administration Panel";
	}
}
else
{
	echo "Login session expired or invalid.";
}
?>
