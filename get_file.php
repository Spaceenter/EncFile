<?php

if($Data = file_get_contents('/tmp/asdf.pdf')) {
	echo $Data;
}
else echo 0;

?>
