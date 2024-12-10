<?php

use App\Http\Controllers\MicroserviceController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
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
    Route::resource('role', RoleController::class);
    Route::resource('permission', PermissionController::class);
    Route::get('/permissions', [PermissionController::class, 'dataTable'])->name('permissions');

    /** Fitur-fitur */
    Route::resource('user', UserController::class);
    Route::get('/users', [UserController::class, 'dataTable'])->name('users');
    Route::resource('microservice', MicroserviceController::class);
    Route::get('/microservices', [MicroserviceController::class, 'dataTable'])->name('services');
});
