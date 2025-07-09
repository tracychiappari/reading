<?php

/*
GET             perusals ...................... perusals.index › PerusalController@index
POST            perusals ...................... perusals.store › PerusalController@store
GET             perusals/create ............... perusals.create › PerusalController@create
GET             perusals/{perusal} ............... perusals.show › PerusalController@show
PUT|PATCH       perusals/{perusal} ............... perusals.update › PerusalController@update
DELETE          perusals/{perusal} ............... perusals.destroy › PerusalController@destroy
GET             perusals/{perusal}/edit .......... perusals.edit › PerusalController@edit
*/

use App\Http\Controllers\PerusalController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/perusals', [PerusalController::class, 'index'])->name('perusals.index');
    Route::post('/perusals', [PerusalController::class, 'store'])->name('perusals.store');
    Route::get('/perusals/create', [PerusalController::class, 'create'])->name('perusals.create');
    Route::get('/perusals/{perusal}', [PerusalController::class, 'show'])->name('perusals.show');
    Route::patch('/perusals/{perusal}', [PerusalController::class, 'update'])->name('perusals.update');
    Route::delete('/perusals/{perusal}', [PerusalController::class, 'destroy'])->name('perusals.destroy');
    Route::get('/perusals/{perusal}/edit', [PerusalController::class, 'edit'])->name('perusals.edit');
});
