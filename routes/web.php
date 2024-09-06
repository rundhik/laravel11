<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $pageConfigs = ['myLayout' => 'front'];
    return view('front-pages.landing', ['pageConfigs' => $pageConfigs]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('pages.dashboard');
    })->name('dashboard');
});
