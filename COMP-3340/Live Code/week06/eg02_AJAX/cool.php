<?php

header('Content-type: text/plain');

$myvar = '123456789';

# comment
//echo "$myvar\n";
/* comment */
//echo $myvar."\n";
// echo date("M d Y H:i:s", mktime(0, 0, 0, 1, 1, 1998));

$myvar = time();

echo "Time: $myvar";

?>
