<?php

//here for version older php than 5.5
//here we want to create random salt for each user
$saltlength=22;
$binarysalt = mcrypt_create_iv($saltlength, MCRYPT_DEV_URANDOM);

//convert the binary salt into a safe string
$salt = substr(strtr(base64_encode($binarysalt), '+', '.'), 0, $saltlength);

echo "Salt length: $salt <br>";
?>
