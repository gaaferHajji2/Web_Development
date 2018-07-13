<?php
//here we generate random salt depending on /dev/urandom
$saltlength = 22;
$binarysalt = file_get_contents('/dev/urandom', false, null, 0, $saltlength);

//convert the binary salt into a safe string
$salt = substr(strtr(base64_encode($binarysalt), '+', '.'), 0, $saltlength);

echo "salt is: $salt<br>";

//set the cost of bcrypt hashing.
//remember to experiment on your server to find the the right value
$cost = 10;

echo "<hr>";
echo "The cost of bcrypt: <br>";
//now we'll combine the algorithm code ($y$) with the cost and our salt
$bcryptsalt = '$2y$'.$cost.'$'.$salt;
echo "The value of bcryptsalt is: $bcryptsalt<br>";
echo "<hr>";
$passwordHash = crypt("password_here", $bcryptsalt);
echo "The Hashing Password is: $passwordHash<br>";
//then we can save it in database, cookies, sessions...etc
?>
