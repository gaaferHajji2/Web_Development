<?php
//version PHP 5.5 or higher, using password_hash

/*
$algo: This parameter expects an integer value that refers to the algorithm to be used for the purpose. Three algorithms are available as follows:
PASSWORD_DEFAULT: This is the recommended algo, as the developer team of PHP are adding new algorithms and updating the following to be the best option.

PASSWORD_BCRYPT: This algorithm uses the CRYPT_BLOWFISH algorithm and generates a crypt() equivalent hash.

PASSWORD_ARGON2I: Uses the Argon2 Hashing Algorithm.
*/
$passwordHash = password_hash("password_hash", PASSWORD_DEFAULT);

echo "The Hashed Password is: $passwordHash<br>";
?>
