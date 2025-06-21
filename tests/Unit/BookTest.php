<?php

use App\Models\Book;
use App\Models\User;

test('can create and retrieve a book with all required fields', function () {
    $user = User::factory()->create();

    $book = Book::factory()->create([
        'user_id' => $user->id,
        'title' => 'Test Book',
        'author' => 'Test Author'
    ]);

    expect($book->fresh())
        ->title->toBe('Test Book')
        ->author->toBe('Test Author')
        ->user_id->toBe($user->id);
});

test('book belongs to a user', function () {
    $user = User::factory()->create();
    $book = Book::factory()->create(['user_id' => $user->id]);

    expect($book->user)
        ->toBeInstanceOf(User::class)
        ->id->toBe($user->id);
});

test('can update book attributes', function () {
    $user = User::factory()->create();
    $book = Book::factory()->create(['user_id' => $user->id]);

    $book->update([
        'title' => 'Updated Title',
        'author' => 'Updated Author'
    ]);

    expect($book->fresh())
        ->title->toBe('Updated Title')
        ->author->toBe('Updated Author');
});

test('can delete a book', function () {
    $user = User::factory()->create();
    $book = Book::factory()->create(['user_id' => $user->id]);
    $bookId = $book->id;

    $book->delete();

    expect(Book::find($bookId))->toBeNull();
});
