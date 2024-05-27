<?php

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
    function error_response(string $message, int $status = 400): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
        ], $status);
    }
}
