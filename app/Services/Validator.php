<?php

namespace App\Services;

class Validator
{
    public static function equalFields(array $field1, array $field2): bool
    {
        if (! $field1 or ! $field2) {
            return false;
        }
        if (count($field1) < count($field2)) {
            return false;
        }

        for ($i = 0; $i < count($field1); $i++) {
            if ($field1[$i] != $field2[$i]) {
                return false;
            }
        }

        return true;
    }
}
