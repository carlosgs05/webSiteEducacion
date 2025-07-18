<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarruselHomeController;
use App\Http\Controllers\DesarrolloController;
use App\Http\Controllers\DocumentoController;
use App\Http\Controllers\NoticiaController;
use App\Http\Controllers\PersonaController;
use App\Http\Controllers\MallaCurricularController;
use App\Http\Controllers\CicloController;
use App\Http\Controllers\AuthController;


Route::post('/login', [AuthController::class, 'login']);
Route::get('/user/{id}', [AuthController::class, 'user']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/profile/update', [AuthController::class, 'updateProfile']);
Route::post('/profile/security', [AuthController::class, 'updateSecurity']);
Route::post('/password/forgot', [AuthController::class, 'forgot']);
Route::post('/password/send-code', [AuthController::class, 'sendResetCode']);
Route::post('/password/validate-code', [AuthController::class, 'validateResetCode']);
Route::post('/password/reset', [AuthController::class, 'resetPassword']);


Route::get('/imagenesHomeCarrusel', [CarruselHomeController::class, 'getImagenes']);
Route::post('/storeImagenesCarrusel', [CarruselHomeController::class, 'storeImagenes']);


Route::get('/organizacion', [PersonaController::class, 'index']);
Route::post('/storeOrganizacion', [PersonaController::class, 'store']);
Route::put('/updateOrganizacion/{id}', [PersonaController::class, 'update']);
Route::delete('/destroyOrganizacion/{id}', [PersonaController::class, 'destroy']);


Route::get('/malla', [MallaCurricularController::class, 'index']);
Route::get('/ciclos', [CicloController::class, 'index']);
Route::post('/storeMalla', [MallaCurricularController::class, 'store']);
Route::post('/updateMalla', [MallaCurricularController::class, 'update']);
Route::delete('/destroyMalla', [MallaCurricularController::class, 'destroy']);



Route::get('/desarrolloProfesional', [DesarrolloController::class, 'index']);
Route::post('/storeDesarrolloProfesional', [DesarrolloController::class, 'store']);
Route::get('/showDesarrolloProfesional/{id}', [DesarrolloController::class, 'show']);
Route::put('/updateDesarrolloProfesional/{id}', [DesarrolloController::class, 'update']);
Route::delete('/destroyDesarrolloProfesional/{id}', [DesarrolloController::class, 'destroy']);

Route::get('/documentos', [DocumentoController::class, 'index']);
Route::post('/storeDocumento', [DocumentoController::class, 'store']);
Route::get('/showDocumento/{id}', [DocumentoController::class, 'show']);
Route::put('/updateDocumento/{id}', [DocumentoController::class, 'update']);
Route::delete('/destroyDocumento/{id}', [DocumentoController::class, 'destroy']);

Route::get('/noticias', [NoticiaController::class, 'index']);
Route::get('/noticiasActuales', [NoticiaController::class, 'noticiasActuales']);
Route::post('/storeNoticia', [NoticiaController::class, 'store']);
Route::get('/showNoticia/{id}', [NoticiaController::class, 'show']);
Route::put('/updateNoticia/{id}', [NoticiaController::class, 'update']);
Route::delete('/destroyNoticia/{id}', [NoticiaController::class, 'destroy']);
