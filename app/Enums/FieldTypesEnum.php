<?php

namespace App\Enums;

enum FieldTypesEnum: string
{
    case STRING = 'string';
    case NUMBER = 'integer';
    case BOOLEAN = 'boolean';
    case ARRAY = 'array';
    case OBJECT = 'object';

}
