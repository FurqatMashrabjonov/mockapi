<?php

use App\Exceptions\ErrorResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;

if (! function_exists('success_response')) {
    function success_response(array|Collection $data, int $status = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $data,
        ], $status);
    }
}

if (! function_exists('error_response')) {
    function error_response(string $message, int $status = 400): \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Response
    {
        return response($message, $status);
    }
}

if (! function_exists('error_if')) {
    /**
     * @throws \App\Exceptions\ErrorResponseException
     */
    function error_if(bool|callable $condition, string $message, string|int $code = 400): void
    {
        $condition = is_callable($condition) ? $condition() : $condition;
        if ($condition === true) {
            throw new ErrorResponseException($message, $code);
        }
    }
}

if (! function_exists('json_response')) {
    function json_response(array $data, int $status = 200): JsonResponse
    {
        return response()->json($data, $status);
    }
}
