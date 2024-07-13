<?php

abstract class html5 extends output
{
    private $title;

    public function __construct($title)
    {
        $this->title = $title;
    }

    public final function generate_prolog()
    {
        global $CFG;

        $title = htmlentities($this->title);
        echo <<<ZZEOF
<!DOCTYPE html>
<html><head><title>$title</title>

ZZEOF;

        # Output all of the required CSS files...
        foreach ($this->css_files_required() as $file)
        {
            $f = http_utils::build_full_url(htmlentities($file, ENT_QUOTES));
            echo "<link rel='stylesheet' type='text/css' href='$f'>";
        }

        # Output all of the required JavaScript files...
        foreach ($this->js_files_required() as $file)
        {
            $f = http_utils::build_full_url(htmlentities($file, ENT_QUOTES));
            echo "<script type='text/javascript' src='$f'></script>";
        }

        echo "</head><body>";
    }

    public final function generate_epilog()
    {
        echo '</body></html>';
    }
}

?>
