<?php
    header('Content-Type: text/html');
    echo "<p>".time() - strtotime("today")."</p>"; // The "." is use for concatinate (similar to "+")
?>
