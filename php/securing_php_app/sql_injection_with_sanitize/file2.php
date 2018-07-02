<?php
	$host="localhost";
	$user="root";
	$pass="";
	$db="cookbook";
	//we must set this variables, otherwise it give error that we cannot pass by reference
	$name="gaafer2_";
	$id=2;

	$conn = new mysqli($host, $user, $pass, $db);

	if($conn){
		$query=$conn->prepare("UPDATE users SET first_name=? WHERE id=?");
		$query->bind_param("si", $name, $id);//this is ok
		//$query->bind_param("si", "gaafer2_", 2);//this give error

		$query->execute();
		echo "users table Updated Successfully";

		$query->close();
		$conn->close();
	}else{
		die("Some Error Happening in Connection to db");
	}
?>
