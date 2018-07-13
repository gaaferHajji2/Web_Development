<html>
	<head>
		<title>Upload Image With Some Validation</title>
	</head>

	<body>
		<form action="upload2.php" method="post" enctype="multipart/form-data">
			<fieldset>
				<legend>Image To Upload</legend>
				<label>Choose Image To Upload: </label>
				<input type="upload" name="filename"/><br><br>

				<input type="submit" value="Upload Image"/>
			</fieldset>
		</form>
	</body>
</html>

<?php
if(!empty($_FILES)){
	$name=$_FILES['filename']['name'];
	echo "<br><br>The Name of File: $name <br><br>";
	$type=$_FILES['filename']['type'];
	switch($type){
		case 'image/jpeg': $ext='jpg'; break;
		case 'image/gif':  $ext='gif'; break;
		case 'image/png':  $ext='png'; break;
		case 'image/tiff': $ext='tif'; break;
		default: 	   $ext='';  ; break;
	}

	if($ext){
		$n= "image.$ext";
		move_uploaded_file($_FILES['filename']['tmp_name'], $n);
		echo "Uploaded image '$name' as '$n': <img src='$n'>";
	}else{
		echo "'$name' is not an accepted image file";
	}
}else{
	echo "<br><br>Please Choose Image To Upload<br><br>";
}
?>
