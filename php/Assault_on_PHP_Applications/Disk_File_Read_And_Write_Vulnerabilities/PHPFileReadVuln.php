<?php
/*
Below is an example of a File Read Vulnerability in PHP, remembering this is just is an example as not all File Read Vulnerabilities will involve the application outputting what is being read. This looks similar to a File Inclusion Vulnerability, remembering in a real world situation File Reads in PHP are used to read information into variable(s) that are used for many purposes.
*/

$template= $_GET['template'];//here we don't sanitize the input, or check it!!!.

$currentdir=getcwd();

echo "Current Directory: $currentdir/$template<br><br>";

if(($filehdl=fopen($currentdir."/$template", 'r'))){
	while(!feof($filehdl)){
		echo fgets($filehdl);
	}
	fclose($filehdl);
}else{
	echo "\n\nUnable to open file.\n";
}

/*
we open the browser to this: (in my laptop)

http://localhost:1234/Assault_on_PHP_Applications/Disk_File_Read_And_Write_Vulnerabilities/PHPFileReadVuln.php?template=../../../lampp
*/
?>
