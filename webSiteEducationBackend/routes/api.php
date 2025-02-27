<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarruselHomeController;
use App\Http\Controllers\DesarrolloController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/imagenesHomeCarrusel', [CarruselHomeController::class, 'getImagenes']);
Route::post('/storeImagenesCarrusel', [CarruselHomeController::class, 'storeImagenes']);

