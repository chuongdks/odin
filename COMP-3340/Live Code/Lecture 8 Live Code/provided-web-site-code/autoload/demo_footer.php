<?php

class demo_footer extends output
{
    protected function do_css_files_required()
    {
        return array('css/demofooter.css');
    }

    public function generate_body()
    {
        return '';
    }
}

?>
