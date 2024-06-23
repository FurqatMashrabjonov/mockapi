<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class Validator
{
    public static function equalFields(array $field1, array $field2): bool
    {
       return $field1 == $field2;
    }
}
