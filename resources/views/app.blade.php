<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="MockAPI is a simple tool that lets you easily mock up APIs, generate custom data, and perform operations on it using RESTful interface. MockAPI is meant to be used as a prototyping/testing/learning tool.">
        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead

        <style>
            .react-flow__panel {
                display: none!important;
            }
        </style>
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
