<?php

namespace App\Http\Controllers;

use App\Http\Requests\Books\StoreBookRequest;
use App\Http\Requests\Books\UpdateBookRequest;
use App\Models\Book;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        if (Auth::user()->cannot('viewAny', Book::class)) {
            abort(403);
        }

        return Inertia::render('books/index', [
            'books' => Auth::user()->books()->with('perusals')->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (Auth::user()->cannot('create', Book::class)) {
            abort(403);
        }

        return Inertia::render('books/create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request)
    {
        if (Auth::user()->cannot('create', Book::class)) {
            abort(403);
        }

        // Get the validated data from the request
        $validated = $request->validated();

        // Handle cover image upload if present
        if ($request->hasFile('cover')) {
            $path = $request->file('cover')->store('covers', 'public');
            $validated['cover'] = $path;
        }

        // Create the book associated with the authenticated user
        $book = Auth::user()->books()->create($validated);

        // Redirect to the books index page with a success message
        return to_route('books.index')
            ->with('message', 'Book created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        if (Auth::user()->cannot('view', $book)) {
            abort(403);
        }

        $book->load('perusals');

        return Inertia::render('books/show', [
            'book' => $book,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        if (Auth::user()->cannot('update', $book)) {
            abort(403);
        }

        return Inertia::render('books/edit', [
            'book' => $book,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        if (Auth::user()->cannot('update', $book)) {
            abort(403);
        }

        // Get the validated data from the request
        $validated = $request->validated();

        // Handle cover image upload if present
        if ($request->hasFile('cover')) {
            $path = $request->file('cover')->store('covers', 'public');
            $validated['cover'] = $path;
        }

        // Update the book associated with the authenticated user
        $book->update($validated);
        $book->save();

        // Redirect to the books index page with a success message
        return to_route('books.show', $book)
            ->with('message', 'Book updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        if (Auth::user()->cannot('delete', $book)) {
            abort(403);
        }

        $book->delete();
        return to_route('books.index')
            ->with('message', 'Book deleted successfully');
    }
}
