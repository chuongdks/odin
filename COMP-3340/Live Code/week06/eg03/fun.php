<?php


header('Content-type: text/plain');

$a_variable = 343;
$a_variable = "3212312";

$an_array[5] = 3212;

for ($i = 0; $i < 10; $i++)
    echo "value is ".$an_array[$i]."\n";

foreach($an_array as $element)
    echo "element: ".$element."\n";

echo "==============\n";

$an_array['dasdas'] = 'fdsfasfsfvzx';

foreach($an_array as $key => $value)
    echo "element: $key => $value\n";

function myfunc($arg1, $arg2)
{
    return $arg1 + $arg2;
}

$a = 1;
$b = 2;
$c = intval($a) + intval($b);

?>
