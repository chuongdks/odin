<?php
require_once('common.php');

$page = new demo(pageid::PAGE2, new silly_output());
$page->generate();

?>
