<?php

final class pageid
{
    public const INVALID = 0;
    public const MAIN = 1;
    public const PAGE2 = 2;

    public static function is_valid($pageID)
    {
        switch ($pageID)
        {
            default:                        return FALSE;
            case self::MAIN:                return TRUE;
            case self::PAGE2:               return TRUE;
        }
    }

    public static function get_full_url($pageID)
    {
        global $CFG;

        $prefix = http_utils::get_site_base_url();
        switch ($pageID)
        {
            default:                        return $prefix;
            case self::MAIN:                return $prefix;
            case self::PAGE2:               return $prefix.'/page2.php';
            // e.g., case self::OTHER:      return $prefix.'other.php';
        }
    }

    public static function get_title($pageID)
    {
        switch ($pageID)
        {
            case self::MAIN:                return 'Main';
            case self::PAGE2:               return 'Page 2!!!!';
            default:                        return 'Invalid';
        }
    }

    public static function get_current_pageid()
    {
        if (!isset($_SESSION['current-page']))
            $_SESSION['current-page'] = self::INVALID;
        return $_SESSION['current-page'];
    }

    public static function set_current_pageid($pageID)
    {
        $_SESSION['current-page'] = $pageID;
    }

    public static function if_invalid_redirect_to_pageid($pageID)
    {
        if (self::is_valid(self::get_current_pageid()) == FALSE)
            http_utils::temporary_redirect_url(self::get_full_url($pageID));
    }
}

?>
