<?php

$FileName = $_POST['FileName'];
$MIMEType = $_POST['MIMEType'];
$FileData = $_POST['FileData'];

$FilePath = '/tmp/'.$FileName;

if(file_put_contents($FilePath, $FileData)) {
	echo 1;
}
else echo 0;

?>