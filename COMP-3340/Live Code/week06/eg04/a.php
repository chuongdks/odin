<?php

session_start();
$_SESSION['uname_preney'] = 123456;

header('Content-type: text/plain');
echo "Set a session value.\n";

?>
