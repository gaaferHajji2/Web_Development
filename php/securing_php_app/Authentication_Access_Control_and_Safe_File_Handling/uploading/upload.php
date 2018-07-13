<html>
	<head>
		<title>Php Form Upload</title>
	</head>

	<body>
		<form action="./upload.php" method="post" enctype="multipart/form-data">
			<label>Enter The File To Upload: </label>
			<input type="file" name="filename" size="10"><br><br>

			<input type="submit" value="Upload"><br><br>
		</form>
	</body>
</html>

<?php
	if($_FILES){
		$name=$_FILES['filename']['name'];
		move_uploaded_file($_FILES['filename']['tmp_name'], $name);
		echo "Uploaded image '$name' <br><br> <img src='$name'><br><br>";
	}

	/*
	1--> $_FILES['file']['name'] 		--> The Name of The uploaded File.
	2--> $_FILES['file']['type'] 		--> The Type of the uploaded File.
	3--> $_FILES['file']['size'] 		--> The File's size in bytes.
	4--> $_FILES['file']['tmp_name']	--> The name of the temporary file stored on the server.
	5--> $_FILES['file']['error']		--> The error code resulting from the file upload.
	*/
?>
