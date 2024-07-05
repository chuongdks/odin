<?php

session_start();
header('Content-type: text/plain');
echo "Print session value:".$_SESSION['uname_preney']."\n";

?>
