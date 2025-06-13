<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
| These routes are loaded by the RouteServiceProvider and are assigned the "api" middleware group.
|
*/

Route::post('/send-notification', function () {
    return response()->json(['message' => 'Endpoint funcionando']);
});
