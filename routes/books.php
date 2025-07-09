<?php

/*
GET             books ...................... books.index › BookController@index
POST            books ...................... books.store › BookController@store
GET             books/create ............... books.create › BookController@create
GET             books/{book} ............... books.show › BookController@show
PUT|PATCH       books/{book} ............... books.update › BookController@update
DELETE          books/{book} ............... books.destroy › BookController@destroy
GET             books/{book}/edit .......... books.edit › BookController@edit
*/

use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/books', [BookController::class, 'index'])->name('books.index');
    Route::post('/books', [BookController::class, 'store'])->name('books.store');
    Route::get('/books/create', [BookController::class, 'create'])->name('books.create');
    Route::get('/books/{book}', [BookController::class, 'show'])->name('books.show');
    Route::patch('/books/{book}', [BookController::class, 'update'])->name('books.update');
    Route::delete('/books/{book}', [BookController::class, 'destroy'])->name('books.destroy');
    Route::get('/books/{book}/edit', [BookController::class, 'edit'])->name('books.edit');
});
