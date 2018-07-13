<html>
	<head>
		<title>Authentication using Cookies</title>
	</head>

	<body>
		<form action="./file2.php" method="post">
			<fieldset>
				<legend>Your Data</legend>
				<input type="text" 			required 		name="username" placeholder="Enter Your userName" autocomplete="off"/><br/><br/>
				<input type="password" 	required 		name="password" placeholder="Enter Your Password"/><br/><br/>
				<input type="hidden" value="set the generated value here" name="hidden"/>

				<input type="submit" value="sent Value"/>
			</fieldset>
		</form>
	</body>
</html>

<?php
	session_start();
	$_SESSION["signedOut"]="NO";

	$username="";
	$password="";

	if(!empty($_COOKIE) && isset($_COOKIE['username']) && isset($_COOKIE['password'])){
		echo "You Are Signed In :)<br><br>";
	}elseif(empty($_COOKIE)){
		echo "The Cookie Array is Empty<br><br>";
	}
	
	if(!empty($_COOKIE)){
		print_r($_COOKIE);
	}

	if(!empty($_POST) && isset($_POST['username']) && isset($_POST['password']) && isset($_POST['hidden'])){
		$username=htmlentities($_POST['username']);
		$password=htmlentities($_POST['password']);

		setcookie('username', $username, time() + 60 * 60 * 24 * 7, '/');//in production we hash, encrypt, salt the username.
		setcookie('password', $password, time() + 60*60*60*24*7, '/');//in production we don't set this value here we saved
		//in our database with hashed values.
	
		echo "Setting Cookies OK!!<br><br>";
	}

	if(!empty($_SESSION) && isset($_SESSION["signedOut"]) && $_SESSION["signedOut"] == "YES"){
		session_destroy();
	}
?>
