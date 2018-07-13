<html>
	<head>
		<title>Test Authentication with cookies and sessions</title>

		<meta charset="UTF-8"/>
	</head>

	<body>
		<form action="./file1.php" method="post">
			<fieldset>
			<legend>Your data: </legend>
			<label>Username: </label><input type="text" required placeholder="Enter Your Username" name="username"/><br/><br/><br/>
			<label>Password: </label><input type="password" required placeholder="Enter Your Password" name="password"/><br/><br/><br/>
			<input type="hidden" value="here we put the generated value, then we save it in the session manager" name="value"/><br/>

			<input type="submit" value="Sent Value"/><br/>
			</fieldset>
		</form>
	</body>
</html>

<?php
	session_start();//for initialize the sessions in PHP.
	$username="";
	$password="";
	$msg="";
	//$_SESSION= array(); //initialize as empty array.
	//$_SESSION["SIGNED"]="NO";

	$_SESSION["SignedOut"]="NO";

	if(isset($_SESSION["SIGNED"]) && $_SESSION["SIGNED"] == "YES"){
		echo "You are successfully signed";
	}
	if(!empty($_POST)&&isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["value"])){
		$_SESSION["SIGNED"]="YES";
		$username=htmlentities($_POST["username"]);
		$password=htmlentities($_POST["password"]);
		echo "You Are Signed Successfully.<br/>Username: $username. <br/>Password: $password<br/>";
	}

	if(isset($_SESSION["SIGNED"])){
		echo "The Value of the session is: ".$_SESSION["SIGNED"]."<br/>";
	}

	if(isset($_SESSION["SignedOut"]) && $_SESSION["SignedOut"] == "YES"){
		session_destroy();//here we will return the value of all sessions to null, not empty array
		echo "The Session is ended<br/>";
	}
?>
