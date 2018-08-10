<?php
$filename= $_FILES['uploadFile']['name'];
$filenameinfo= pathinfo($filename);
$filename_exten = $filenameinfo['extension'];

if(($filename_exten == 'jpg') || ($filename_exten == 'jpeg') || ($filename_exten == 'gif') || ($filename_exten == 'png')){
	if($_FILES['uploadFile']['error'] > 0){
		echo "Return Code: " . $_FILES['uploadFile']['error']."<br/>";
	}elseif(!getimagesize($_FILES['uploadFile']['tmp_name'])){
		echo "File has valid extension, but does not appear to be an image.\n";
		echo "May be an attempt to upload code to the server.";
		exit();
	}
	else{
		echo "Upload:    ". $_FILES['uploadFile']['name']."<br/>";
		echo "Type:      ". $_FILES['uploadFile']['type']."<br/>";
		echo "Size:      ". ($_FILES['uploadFile']['size']/1024)." Kb<br/>";
		echo "Temp_name: ". $_FILES['uploadFile']['tmp_name']."<br/>";
		if(file_exists($_FILES['uploadFile']['name'])){
			echo $_FILES['uploadFile']['name']."already exists";
		}else{
			//here we must validate the content of the image using any anti-virus, reverse-tool, ...etc
			move_uploaded_file($_FILES['uploadFile']['tmp_name'], $_FILES['uploadFile']['name']);
			echo "Stored in ". __DIR__ . '/' .$_FILES['uploadFile']['name']."<br/>";
			echo "<img src='".$_FILES['uploadFile']['name']."' alt='image file that we uploaded'/>";
		}
	}
}else{
	echo "Invalid file type.";
}
?>
