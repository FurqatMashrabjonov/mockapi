<?php

namespace App\Enums;

enum ErrorMessagesEnum: string
{
    case PROJECT_NOT_FOUND = 'Project not found';
    case INVALID_PATH = 'Invalid path';
    case METHOD_NOT_ALLOWED = 'Method not allowed';
    case DATA_IS_EMPTY = 'Data is empty';
    case ID_IS_INCORRECT = 'ID is incorrect';
    case DATA_NOT_FOUND = 'Data not found';
}
