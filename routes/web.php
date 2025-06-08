<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
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
});
