<?php

class html5hmflayout extends html5
{
    private $pagecss;
    private $pagejs;
    private $header;
    private $midsection;
    private $footer;

    public function __construct(
        $title,
        $pagecss,
        $pagejs,
        output $header,
        output $midsection,
        output $footer
    )
    {
        parent::__construct($title);

        // process $pagecss...
        if (is_array($pagecss))
            $this->pagecss = $pagecss;
        elseif (is_string($pagecss))
            $this->pagecss = array($pagecss);
        else
            $this->pagecss = array();

        // process $pagejs...
        if (is_array($pagejs))
            $this->pagejs = $pagejs;
        elseif (is_string($pagejs))
            $this->pagejs = array($pagejs);
        else
            $this->pagejs = array();

        // store remaining variables...
        $this->header = $header;
        $this->midsection = $midsection;
        $this->footer = $footer;
    }

    protected final function do_css_files_required()
    {
        return
            array_unique(
                array_merge(
                    $this->header->css_files_required(),
                    $this->midsection->css_files_required(),
                    $this->footer->css_files_required(),
                    $this->pagecss
                )
            )
        ;
    }

    protected final function do_js_files_required()
    {
        return
            array_unique(
                array_merge(
                    $this->header->js_files_required(),
                    $this->midsection->js_files_required(),
                    $this->footer->js_files_required(),
                    $this->pagejs
                )
            )
        ;
    }

    public function generate_body()
    {
        echo "<div id='header'>\n";
        $this->header->generate();
        echo "\n</div>\n<div id='midsection'>\n";
        $this->midsection->generate();
        echo "\n</div>\n<div id=\"footer\">\n";
        $this->footer->generate();
        echo "\n</div>\n";
    }
}


?>
