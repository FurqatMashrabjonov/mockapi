<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class IndexController extends Controller
{
    public function welcome(): Response|RedirectResponse
    {
        if (auth()->check()) {
            return redirect()->route('dashboard');
        }

        console()->table(Resource::all());

        return Inertia::render('Welcome');
    }

    public function docs()
    {
        return Inertia::render('Docs');
    }
}
