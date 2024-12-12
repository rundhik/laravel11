<?php

use App\Http\Controllers\GatewayController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::match(
        ['get', 'post', 'put', 'delete'],
        '/gateway/{microservice}/{endpoint?}',
        [GatewayController::class, 'forward'])
    ->where('endpoint', '.*');
});
