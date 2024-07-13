<?php

class demo_header extends output
{
    protected function do_css_files_required()
    {
        return array('css/demoheader.css');
    }

    public function generate_body()
    {
        return '';
    }
}

?>
