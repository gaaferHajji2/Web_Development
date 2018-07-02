<?php
$host="mysql:host=localhost;dbname=cookbook";
$user="root";
$pass="";

$conn=new PDO($host, $user, $pass);

if($conn){
	$query=$conn->prepare("UPDATE users SET first_name= :first_name WHERE id=:id");
	$query->execute([':first_name' => 'gaafer_', ':id' => 1]);
	echo "Update Value OK!!!";
}
?>
