NOTE:
    Place the files for this site on a web server to see them run, etc. These files
    will not work by opening them in a browser.

Items to note about this code:

    * The empty index.html files are a security precaution: anyone attempting
      to access that directory in a URL will be given an empty index.html by
      the web server. Is it foolproof? Does it need to be done? No, but it 
      can help with some misconfiguations of the web server and it is easy 
      to do. (It is common to see this done. since it is easy to do and has
      no real downsides since it can be scripted, etc.)

    * config.php is meant to be only readable by the web server and has
      important site-wide information in it that should only be in one place, 
      e.g.,
          - database connection strings/URLs
          - passwords
          - etc.
      Do not copy-and-paste such things all over your web site code: keep it
      in one place. config.php defines a global variable $CFG with its settings
      that (due to code in common.php) is "included" in all other code.

      Besides software design reasons, the other reasons to have such in one
      file is for security reasons. Typically, config.php on web servers will
      only have read permissions and will only be accessible by the web server
      unlike many other files for that web site. This makes it harder for
      someone malicious to attack/hack/modify the contents of config.php.

    * common.php, why is it needed? As you've seen in this course a PHP
      file produces output and without doing something about it each PHP 
      file will produce a page of output. What if one wants to call some
      functions, etc. in another PHP file? How are such files loaded and used,
      etc.? PHP has an "autoload" feature that can be used to do this and
      without it, either one manually includes those other files in the PHP 
      code or it cannot be done. (PHP is now version 8 so a number of things
      have been learnt over the years and using PHP autoloading should be
      done to simplify loading different files.)

      The autoloading configuration in common.php loads <CLASS>.php from the
      autoload/ directory where <CLASS> is the name of the class. If 
      <CLASS>.php does not exist, then an error occurs which PHP reports to
      the site's logs (not to the client web browser).

    * To see how it all works look at the code how it was presented, e.g.,

        1) index.php

        2) See the "require_once"'s common.php and this is the only 
           "included" file in the site. (It is the only needed once since it
           tells PHP to use its autoload feature. The web URL for 
           require_once is here:
           https://www.php.net/manual/en/function.require-once.php .)

        3) autoload/demo.php, autoload/pageid.php, autoload/no_output.php

        4) Then look at those classes, base classes.
        5) Then look at those classes, base classes, etc.

      i.e., rather than copying-and-pasting the code over and over again on
      multiple pages, this code allows one to create a class and have it
      produce output. So each page turns into a derived class where one
      provides the content that is desired and the rest is automatically
      produced. This makes the work to write and maintain the code much
      easier (as doing the same in object-oriented programming does).

