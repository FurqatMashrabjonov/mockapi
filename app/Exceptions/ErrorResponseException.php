<?php

namespace App\Exceptions;

use Exception;

class ErrorResponseException extends Exception
{
    public function __construct($message, $code = 0, ?Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    public function report()
    {
        //
    }

    public function render(): \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Response
    {
        return error_response($this->getMessage(), $this->getCode());
    }
}
