<?php

namespace App\Services;

class Validator
{
    public static function equalFields(array $field1, array $field2): bool
    {
        return $field1 == $field2;
    }
}
