<?php

final class actionid
{
    public const INVALID = 0;
    public const WHATEVER = 1;

    public static function is_valid($actionID)
    {
        switch ($actionID)
        {
            default:                        return FALSE;
            case self::WHATEVER:            return TRUE;
        }
    }

    public static function get_full_url($actionID)
    {
        global $CFG;

        $prefix = http_utils::get_site_base_url();
        switch ($actionID)
        {
            default:                        return $prefix;
            case self::WHATEVER:            return $prefix;
            // e.g., case self::OTHER:    return $prefix.'dir1/dir2/file.php';
            // e.g., case self::OTHER:    return $prefix.'actions/file.php';
        }
    }

    public static function get_title($actionID)
    {
        switch ($actionID)
        {
            default:                        return 'Invalid';
            case self::WHATEVER:            return 'Whatever';
        }
    }
}

?>
