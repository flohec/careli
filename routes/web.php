<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ServerRackConfigController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '^(?!api).*'); // Exclude routes starting with "api"

Route::get('api/user', [AuthController::class, 'authenticate']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

//TODO : Add middleware for authentication and admin checks

Route::group(['prefix' => 'api/admin'], function () {
    Route::get('/get-all-users', [UserController::class, 'getAllUsers']);
    Route::get('/get-all-companies', [CompanyController::class, 'getAllCompanies']);
    Route::get('/get-all-articles', [ArticleController::class, 'getAllArticles']);

    Route::put('/update-company/{company}', [CompanyController::class, 'update']);
    Route::put('/update-user/{user}', [UserController::class, 'update']);

    Route::post('/articles', [ArticleController::class, 'store']);
    Route::put('/articles/{article}', [ArticleController::class, 'update']);
});

Route::group(['prefix' => 'api/user'], function () {
    Route::post('/config/create', [ServerRackConfigController::class, 'store']);
    Route::get('/configs', [ServerRackConfigController::class, 'show']);
    Route::delete('/config/{id}', [ServerRackConfigController::class, 'destroy']);
});
