<?php

use App\Http\Controllers\Auth\SocialLoginController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ResourceController;
use Illuminate\Foundation\Application;
use Gemini\Laravel\Facades\Gemini;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::redirect('/dashboard', '/projects');

Route::get('/projects', [ProjectController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

Route::controller(SocialLoginController::class)
    ->as('social-login.')
    ->prefix('social-login')
    ->group(function () {
        Route::get('{provider}', 'redirectToProvider')->name('redirect');
        Route::get('{provider}/callback', 'handleProviderCallback')->name('callback');
    });

Route::get('/gemini', function () {
    $result = Gemini::geminiPro()->generateContent('is gemini better than chatGPT?');

    return $result->text();

});

Route::controller(ProjectController::class)
    ->prefix('projects')
    ->as('projects.')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::post('/', 'store')->name('store');
        Route::get('/{project}', 'show')->name('show');
        Route::delete('/{project}', 'destroy')->name('destroy');
    });

Route::controller(ResourceController::class)
    ->prefix('resources')
    ->as('resources.')
    ->group(function () {
        Route::get('/fields', 'fields')->name('fields');
        Route::post('generate/ai', 'generateWithAI')->name('generate.ai');
        Route::get('/{project}', 'index')->name('index');
        Route::post('/{project}', 'createOrUpdate')->name('store');
        Route::get('/{project}/{resource}', 'show')->name('show');
        Route::delete('/{project}/{resource}', 'destroy')->name('destroy');
    });


Route::controller(DataController::class)
    ->prefix('data')
    ->as('data.')
    ->group(function () {
        Route::post('generate/{project}/{resource}', 'generate')->name('generate');
        Route::post('generate-all/{project}', 'generateAll')->name('generate-all');
        Route::post('reset-all/{project}', 'resetAll')->name('reset-all');
    });

Route::get('/postman', function () {
    $project = \App\Models\Project::find(26);
    return \App\Services\RestApiGenerator::postman($project);
});
