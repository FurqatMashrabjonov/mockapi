<?php

use App\Http\Controllers\Auth\SocialLoginController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RelationController;
use App\Http\Controllers\ResourceController;
use App\Services\AimlApiService;
use App\Services\Export\Javascript;
use App\Services\RestApiGenerator;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;

Route::controller(IndexController::class)->group(function () {
    Route::get('/', 'welcome')->name('welcome');
    Route::get('docs', 'docs')->name('docs');
});

Route::redirect('/dashboard', '/projects');

Route::get('/projects', [ProjectController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::controller(SocialLoginController::class)
    ->as('social-login.')
    ->prefix('social-login')
    ->group(function () {
        Route::get('{provider}', 'redirectToProvider')->name('redirect');
        Route::get('{provider}/callback', 'handleProviderCallback')->name('callback');
    });

Route::controller(ProjectController::class)
    ->prefix('projects')
    ->as('projects.')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::post('/', 'store')->name('store');
        Route::get('/{project}', 'show')->name('show');
        Route::post('/{project}', 'update')->name('update');
        Route::delete('/{project}', 'destroy')->name('destroy');
        Route::get('/{project}/export/{tool}', 'export')->name('export');
        Route::post('/{project}/code-examples/{language}', 'codeExample')->name('code.examples');
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
        Route::delete('{resource}', 'destroy')->name('destroy');
    });

Route::controller(DataController::class)
    ->prefix('data')
    ->as('data.')
    ->group(function () {
        Route::post('generate/{project}/{resource}', 'generate')->name('generate');
        Route::post('generate-all/{project}', 'generateAll')->name('generate-all');
        Route::post('reset-all/{project}', 'resetAll')->name('reset-all');
    });

Route::controller(RelationController::class)
    ->prefix('relations')
    ->as('relations.')
    ->group(function () {
        Route::post('connect', 'connect')->name('connect');
    });

Route::get('/login-me', function () {
    \Illuminate\Support\Facades\Auth::login(\App\Models\User::first());

    return redirect('/projects');
});

Route::get('/code', function () {
    $project = \App\Models\Project::find(35);
    $routes = RestApiGenerator::generate($project);

    $export = new Javascript();
    $export->routes($routes);
    $export->project($project);
    $export->endpoint(RestApiGenerator::getEndpoint($project));
    $export->generate();

    $content = $export->text();

    return view('code', compact('content'));
});

Route::get('/code-api', function () {
    $project = \App\Models\Project::find(35);
    $routes = RestApiGenerator::generate($project);

    $export = new Javascript();
    $export->routes($routes);
    $export->project($project);
    $export->endpoint(RestApiGenerator::getEndpoint($project));
    $export->generate();

    $content = $export->text();

    return response()->json([
        'content' => $content,
    ]);
})->name('code-api');

Route::get('/ai-generate', function () {
    $engine = new AimlApiService();
    $project = \App\Models\Project::with('resources')->find(36);
    $res = $engine->generate($project->name, 'this is simple Todo app', $project->resources->toArray());
    dd($res);
});
