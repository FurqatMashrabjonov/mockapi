<?php

use App\Http\Controllers\DataController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RelationController;
use App\Http\Controllers\ResourceController;
use Gemini\Data\Content;
use Gemini\Enums\Role;
use Gemini\Laravel\Facades\Gemini;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Route::controller(ProjectController::class)
//    ->prefix('projects')
//    ->as('projects.')
//    ->middleware('fake_user_login') //TODO: Delete after testing
//    ->group(function () {
////        Route::get('/', 'index')->name('index');
////        Route::post('/', 'store')->name('store');
////        Route::get('/{project}', 'show')->name('show');
////        Route::delete('/{project}', 'destroy')->name('destroy');
////    });
//
//Route::controller(ResourceController::class)
//    ->prefix('resources')
//    ->as('resources.')
//    ->middleware('fake_user_login') //TODO: Delete after testing
//    ->group(function () {
//        Route::get('/{project}', 'index')->name('index');
//        Route::post('/{project}', 'store')->name('store');
//        Route::get('/{project}/{resource}', 'show')->name('show');
//        Route::delete('/{project}/{resource}', 'destroy')->name('destroy');
//    });

//Route::controller(DataController::class)
//    ->prefix('data')
//    ->as('data.')
//    ->middleware('fake_user_login') //TODO: Delete after testing
//    ->group(function () {
//        Route::post('generate/{project}/{resource}', 'generate')->name('generate');
//    });

Route::controller(RelationController::class)
    ->prefix('relations')
    ->as('relations.')
    ->middleware('fake_user_login')
    ->group(function () {
        Route::post('connect', 'connect')->name('connect');
    });

Route::any('tictactoe', function (Request $request) {
    $chat = Gemini::chat()
        ->startChat(history: [
            Content::parse(part: 'We are playing tic tac toe game with 3x3 grid. You are '.$request->role, role: Role::USER),
            Content::parse(part: 'ok', role: Role::MODEL),
            Content::parse(part: 'this is the board: '.json_encode($request->board), role: Role::USER),
        ]);

    $response = $chat->sendMessage('your turn. please give me answer as an array of 2 integers. for example [0, 1]');

    $res = $response->text();

    $arr = json_decode($res, true);

    return response()->json([
        'response' => $arr,
    ]);

});
