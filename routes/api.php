<?php

use App\Http\Controllers\GatewayController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::match(['get', 'post', 'put', 'delete'], '/gateway/{microservice}/{endpoint?}', [GatewayController::class, 'handle'])->where('endpoint', '.*');
