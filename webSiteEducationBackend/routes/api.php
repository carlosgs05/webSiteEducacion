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

Route::get('/desarrolloProfesional', [DesarrolloController::class, 'index']);
Route::post('/storeDesarrolloProfesional', [DesarrolloController::class, 'store']);
Route::get('/showDesarrolloProfesional/{id}', [DesarrolloController::class, 'show']);
Route::put('/updateDesarrolloProfesional/{id}', [DesarrolloController::class, 'update']);
Route::delete('/destroyDesarrolloProfesional/{id}', [DesarrolloController::class, 'destroy']);
