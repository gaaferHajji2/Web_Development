<html>
	<head>
		<title>Gaafer Small Sanitize Application</title>
		<meta charset="utf-8"/>
	</head>

	<body>
		<form action="./file3.php" method="post">
			<input type="text" name="test" />
			<input type="submit" value="send value"/> 
		</form>
		
		<?php
			if(isset($_POST['test'])){
				//test html entities
				$test = htmlentities($_POST['test']);
				//test htmlspecialchars
				$test = htmlspecialchars($_POST['test']);
				
				echo "<br>$test<br>";
			}
		?>
		
	</body>
</html>
