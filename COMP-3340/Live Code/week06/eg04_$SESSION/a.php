<?php

session_start();
$_SESSION['uname_preney'] = "addcslashes";

header('Content-type: text/plain');
echo "Set a session value.\n";

?>
