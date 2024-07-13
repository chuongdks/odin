<?php

abstract class output
{
    public final function css_files_required()
    {
        return $this->do_css_files_required();
    }

    public final function js_files_required()
    {
        return $this->do_js_files_required();
    }

    // by default no CSS files are required...
    protected function do_css_files_required() 
    {
        return array();
    }

    // by default no Javascript files are required...
    protected function do_js_files_required()
    {
        return array();
    }

    public final function generate()
    {
        $this->generate_prolog();
        $this->generate_body();
        $this->generate_epilog();
    }

    // by default generate_prolog() does nothing...
    public function generate_prolog()
    {
    }

    // require derived classes to define generate_body()...
    abstract public function generate_body();

    // by default generate_epilog() does nothing...
    public function generate_epilog()
    {
    }
}

?>
