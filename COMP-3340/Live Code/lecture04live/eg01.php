<?php      

$mystr = <<<ZZEOF
<!DOCTYPE html>
<html>
    <body>
        <h1>Heading 1</h1>
        <p>This is some text.</p>
    </body>
</html>
ZZEOF;

$str = "dsadsadas";
$str2 = <<<ZZEOF
fdkjfadshf afads'fads
fdasf
dsaf
dasf
dsa $str
fads
f
adsf
ZZEOF;
$arr = array();
$arr2 = array('key' => 'value');
$arr3 = array(1, 2, 3, 4, 5, 6, );

function name($arg1, $arg2, $arg3)
{
}

$text = "Heading 1";

?>
<!DOCTYPE html>
<html>
    <body>
        <h1><?php echo $text; ?></h1>
        <p>This is some text.</p>
    </body>
</html>
