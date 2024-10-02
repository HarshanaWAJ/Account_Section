<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

use App\Http\Controllers\OfficerController;

// Add your routes here
Route::get('/officers/add', [OfficerController::class, 'create'])->name('add.officers');
Route::get('/officers/manage', [OfficerController::class, 'index'])->name('manage.officers');
Route::get('/projects/add', [OfficerController::class, 'create'])->name('add.projects');
Route::get('/projects/manage', [OfficerController::class, 'index'])->name('manage.projects');



require __DIR__.'/auth.php';
