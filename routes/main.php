<?php

use App\Http\Controllers\Api\MainController;
use Illuminate\Support\Facades\Route;

Route::group(['domain' => '{project_uuid}.'.config('app.domain')], function () {
    Route::any('/{path}', [MainController::class, 'handler'])
        ->where(['path' => '.*'])->name('main');
});
