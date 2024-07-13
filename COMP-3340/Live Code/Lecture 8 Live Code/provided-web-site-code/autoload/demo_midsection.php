<?php

class demo_midsection extends output
{
    private $css;
    private $js;
    private $content;
    private $menu;
    private $has_menu;

    public function __construct(
        output $content = new no_output(),
        $css = array(),
        $js = array(),
        output $menu = null
    )
    {
        if (is_array($css))
          $this->css = $css;
        elseif (is_string($css))
          $this->css = array($css);
        else
          $this->css = array();

        if (is_array($js))
          $this->js = $js;
        elseif (is_string($js))
          $this->js = array($js);
        else
            $this->js = array();

        $this->content = $content;
        $this->menu = $menu;
        $this->has_menu = ($menu !== NULL);
        if ($this->has_menu === false)
            $this->menu = new no_output();
    }

  protected function do_css_files_required()
  {
    return
      array_unique(
        array_merge(
          $this->menu->css_files_required(),
          $this->content->css_files_required(),
          $this->css
        )
      )
    ;
  }

  protected function do_js_files_required()
  {
    return
      array_unique(
        array_merge(
          $this->menu->js_files_required(),
          $this->content->js_files_required(),
          $this->js
        )
      )
    ;
  }

  public function generate_body()
  {
    if ($this->has_menu)
    {
      echo "\n<div id='menu'>\n";
      $this->menu->generate();
      echo "\n</div>";
    }

    echo "\n<div id='content'>\n";
    $this->content->generate();
    echo "\n</div>\n";
  }
}

?>
