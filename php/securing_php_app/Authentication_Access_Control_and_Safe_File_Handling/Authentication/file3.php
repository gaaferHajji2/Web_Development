<html>
	<head>
		<title>Test Server Authentication(old way)</title>
	</head>

	<body>
		The Authentication Page.
	</body>
</html>


<?php
session_start();

$name="Gaafer";
$pass="Password";

if(!empty($_SERVER) && isset($_SERVER['PHP_AUTH_USER'])
&& isset($_SERVER['PHP_AUTH_PW'])){
	if($_SERVER['PHP_AUTH_USER'] == $name &&
	   $_SERVER['PHP_AUTH_PW'] == $pass){
		echo "Welcome User: ". $_SERVER['PHP_AUTH_USER'] ."<br>".
		"Password: ". $_SERVER['PHP_AUTH_PW']."<br>";
	}
}else{
	header("WWW-Authenticate: Basic realm='Restricted Section'");
	header("HTTP/1.0 401 Unauthorized");
	echo "<br><br>Please Enter Your Authentication Information<br></br>";
}

session_destroy();
?>
